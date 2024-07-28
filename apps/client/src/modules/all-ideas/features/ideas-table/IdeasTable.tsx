import type { ColumnDef } from '@tanstack/react-table';
import { useFields, useIdea, useIdeas } from '../../../../api';
import { DataTable } from '../../../../components/ui/data-table';
import { cellMapper } from '../../../../utils';
import { columns } from './components/columns';
import type { Idea } from './types';

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
        header: field.label,
        cell: ({ row }) => {
          return cellMapper(field, row.getValue(field.id), (newValue) =>
            handleCellChange(row.original.id, field.id, newValue),
          );
        },
      };
    }) ?? [];

  const ideasData = transformIdeas(ideas.data ?? []);

  return <DataTable columns={[...columns, ...customColumns]} data={ideasData} />;
}

function transformIdeas(ideas: Idea[]) {
  return ideas.map((idea) => {
    const transformedIdea: any = {
      id: idea.id,
      title: idea.title,
      description: idea.description,
      author: idea.author,
    };

    idea.fieldsValues?.forEach((field: { fieldId: string; value: any }) => {
      transformedIdea[field.fieldId] = field.value;
    });

    return transformedIdea;
  });
}

export { IdeasTable };
