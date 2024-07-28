import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../../components/ui/data-table';
import { cellMapper } from '../../../../utils';
import { useFields, useIdea, useIdeas } from './api';
import { Idea } from './types';

function IdeasTable() {
  const ideas = useIdeas();
  const { data: fields, isPending: isFieldsPending } = useFields();
  const { updateIdeaMutation } = useIdea();

  if (isFieldsPending || ideas.isPending) {
    return <>Loading...</>;
  }

  const handleCellChange = (ideaId: string, fieldId: string, newValue: any) => {
    updateIdeaMutation.mutate({
      id: ideaId,
      [fieldId]: newValue,
    });
  };
  const customColumns: ColumnDef<Idea>[] =
    fields?.map((field) => {
      return {
        accessorKey: field.id,
        header: field.name,
        cell: ({ row }) => {
          return cellMapper(field, row.getValue(field.id), (newValue) =>
            handleCellChange(row.original.id, field.id, newValue),
          );
        },
      };
    }) ?? [];

  return <DataTable columns={[...customColumns]} data={ideas.data ?? []} />;
}

export { IdeasTable };
