import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '../../../../../components/ui/checkbox';
import { Idea } from '../types';

export const columns: ColumnDef<Idea>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <span>{row.getValue('title')}</span>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];
