import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../../../../../config';
import { debounce } from '../../../../../utils';
import { Idea } from '../types';

async function createIdea(payload: Idea) {
  const res = await fetch(`${BASE_URL}/ideas`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data as Idea;
}

async function deleteIdea(id: string) {
  const res = await fetch(`${BASE_URL}/ideas/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data as Idea[];
}

async function updateIdea(payload: Partial<Idea>) {
  const { id, ...restPayload } = payload;
  const res = await fetch(`${BASE_URL}/ideas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(restPayload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data as Idea[];
}

const createIdeaWithUpdate = async (payload: any) => {
  const res = await createIdea(payload);
  const newPayload = { ...payload, id: res.id, fieldsValues: res?.fieldsValues };
  newPayload.fieldsValues = newPayload?.fieldsValues?.map((field: any) => {
    if (field?.fieldId === payload?.statusFieldId) {
      return { ...field, value: payload?.status };
    } else return field;
  });
  const updateRes = await updateIdea(newPayload);
  return updateRes;
};

function useIdea() {
  const queryClient = useQueryClient();

  const createIdeaMutation = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  const createWithUpdateMutation = useMutation({
    mutationFn: createIdeaWithUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  const deleteIdeaMutation = useMutation({
    mutationFn: deleteIdea,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  const updateIdeaMutation = useMutation({
    mutationFn: updateIdea,
    onMutate: async (newIdea) => {
      await queryClient.cancelQueries({ queryKey: ['ideas'] });
      const previousIdeas = queryClient.getQueryData<Idea[]>(['ideas']);
      queryClient.setQueryData<Idea[]>(['ideas'], (old) =>
        old?.map((idea) => (idea.id === newIdea.id ? { ...idea, ...newIdea } : idea)),
      );
      return { previousIdeas };
    },
    onError: (err, newIdea, context) => {
      queryClient.setQueryData(['ideas'], context?.previousIdeas);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  const debouncedUpdate = debounce((payload: Partial<Idea>) => {
    updateIdeaMutation.mutate(payload);
  }, 500);

  return {
    createIdeaMutation,
    deleteIdeaMutation,
    createWithUpdateMutation,
    updateIdeaMutation: {
      ...updateIdeaMutation,
      mutate: debouncedUpdate,
    },
  };
}

export { useIdea };
