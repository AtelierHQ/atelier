import { BASE_URL } from '@/config';
import { useQuery } from '@tanstack/react-query';

type Idea = {
  id: string;
};

async function fetchIdeas() {
  const res = await fetch(`/ideas`);
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data as Idea[];
}

function useIdeas() {
  return useQuery({
    queryKey: ['ideas'],
    queryFn: fetchIdeas,
  });
}

export { useIdeas, Idea };
