import { ColumnDef } from '@tanstack/react-table';

import { Idea } from '../types';

export const getColumns = (handleTitleClick: (value: any) => void): ColumnDef<Idea>[] => [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return (
        <span
          className="underline text-blue-700 cursor-pointer"
          onClick={() => handleTitleClick(row.original)}
        >
          {row.getValue('title')}
        </span>
      );
    },
    size: 200,
    minSize: 200,
  },
];
