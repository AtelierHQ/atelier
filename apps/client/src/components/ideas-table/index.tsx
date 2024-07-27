import { useIdeas } from '@/api/useIdeas';

function IdeasTable() {
  const ideas = useIdeas();
  return (
    <div>
      {ideas.status}
      {JSON.stringify(ideas.data, null, 2)}
    </div>
  );
}

export { IdeasTable };
