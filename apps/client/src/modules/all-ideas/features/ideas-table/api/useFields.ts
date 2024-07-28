import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../../../../../config';
import { Field } from '../types';
async function fetchFields() {
  const res = await fetch(`${BASE_URL}/fields`);
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  if (typeof data === 'string') {
    return JSON.parse(data) as Field[];
  }
  return data as Field[];
}

function useFields() {
  return useQuery({
    queryKey: ['fields'],
    queryFn: fetchFields,
  });
}

export { useFields };
