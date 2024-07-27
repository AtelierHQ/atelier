import { ColumnDef } from '@tanstack/react-table';
import { Idea } from '../../api/useIdeas';

export const columns: ColumnDef<Idea>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <span>{row.getValue('title')}</span>;
    },
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
];
