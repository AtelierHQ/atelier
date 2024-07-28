import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../../../../../config';
import { debounce } from '../../../../../utils';
import { Idea } from '../types';

async function createIdea(payload: Idea) {
  const res = await fetch(`${BASE_URL}/idea`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data as Idea[];
}

async function updateIdea(payload: Partial<Idea>) {
  const { id, ...restPayload } = payload;
  const res = await fetch(`${BASE_URL}/idea/${id}`, {
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

  const createIdeaMutation = useMutation({ mutationFn: createIdea });

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
    updateIdeaMutation: {
      ...updateIdeaMutation,
      mutate: debouncedUpdate,
    },
  };
}

export { useIdea };
