import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../../../../../config';
import { Idea } from '../types';
async function fetchIdeas() {
  const res = await fetch(`${BASE_URL}/ideas`);
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

export { useIdeas };
