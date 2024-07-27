import { Idea } from '@/api/useIdeas';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Idea>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
];
