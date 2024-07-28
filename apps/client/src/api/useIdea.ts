import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../config';
import type { Idea } from '../modules/all-ideas/features/ideas-table/types';
import { debounce } from '../utils';

async function createIdea(payload: Partial<Idea>) {
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
  return data as Idea[];
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
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data as Idea[];
}

function useIdea() {
  const queryClient = useQueryClient();

  const createIdeaMutation = useMutation({
    mutationFn: createIdea,
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

  const createWithUpdateMutation = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
  });

  return {
    createIdeaMutation,
    deleteIdeaMutation,
    updateIdeaMutation: {
      ...updateIdeaMutation,
      mutate: debouncedUpdate,
    },
    createWithUpdateMutation,
  };
}

export { useIdea };
