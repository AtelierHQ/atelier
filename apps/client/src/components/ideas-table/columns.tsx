import { ColumnDef } from '@tanstack/react-table';

import { Idea } from '../../api/useIdeas';
import { Checkbox } from '../ui/checkbox';

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
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const allTags = (row.getValue('tags') as any[]).filter((tag) => tag != null);
      return allTags.length > 0 ? (
        <div className="flex gap-2">
          {allTags.map((tag, index) => (
            <span className="bg-blue-200 text-blue-900 py-1 px-2 rounded-sm">{tag}</span>
          ))}
        </div>
      ) : (
        '-'
      );
    },
  },
];
