import type { ColumnDef } from '@tanstack/react-table';
import { useFields, useIdea, useIdeas } from '../../../../api';
import { DataTable } from '../../../../components/ui/data-table';
import { cellMapper } from '../../../../utils';
import { getColumns } from './components/columns';
import type { Idea } from './types';

type Props = {
  handleIdeModalDetails: (values?: any) => void[];
};

function IdeasTable({ handleIdeModalDetails }: Props) {
  const ideas = useIdeas();
  const { data: fields, isPending: isFieldsPending } = useFields();
  const { updateIdeaMutation } = useIdea();

  if (isFieldsPending || ideas.isPending) {
    return <>Loading...</>;
  }

  const handleCellChange = (ideaId: string, fieldId: string, newValue: any) => {
    const idea = ideas.data?.find((idea) => idea.id === ideaId);
    const updatedFieldValues = idea?.fieldsValues?.map((field: any) => {
      if (field?.fieldId === fieldId) {
        return { ...field, value: newValue };
      } else return field;
    });

    const updatedIdea = { ...idea, fieldsValues: updatedFieldValues, author: null } as any;
    updateIdeaMutation.mutate(updatedIdea);
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

  return (
    <DataTable
      columns={[...getColumns(handleIdeModalDetails), ...customColumns]}
      data={ideasData}
    />
  );
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
