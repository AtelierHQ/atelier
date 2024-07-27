import { useIdeas } from '../../../../api/useIdeas';
import { DataTable } from '../../../../components/ui/data-table';
import { columns } from './components/columns';

function IdeasTable() {
  const ideas = useIdeas();

  if (ideas.isPending) {
    return <>Loading...</>;
  }

  return <DataTable columns={columns} data={ideas.data ?? []} />;
}

export { IdeasTable };
