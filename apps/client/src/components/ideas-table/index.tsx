import { useIdeas } from '../../api/useIdeas';
import { DataTable } from '../ui/data-table';
import { columns } from './columns';

function IdeasTable() {
  const ideas = useIdeas();

  if (ideas.isPending) {
    return <>Loading...</>;
  }

  return <DataTable columns={columns} data={ideas.data ?? []} />;
}

export { IdeasTable };
