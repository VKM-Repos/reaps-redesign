import { KeywordItems, SpecializationItems } from '@/types/specialization';
import type { ColumnDef } from '@tanstack/react-table';
import ModifySpecialization from '../../edit-specializations';
import DeleteSpecialization from './delete-specialization';

const columns: Array<ColumnDef<SpecializationItems>> = [
  {
    header: 'Specialization',
    accessorKey: 'title',
  },
  {
    header: 'Keywords',
    accessorKey: 'keywords',
    cell: ({ row }) => {
      const { keywords } = row.original;
      return (
        <div>
          {keywords.map((keyword: KeywordItems) => (
            <span key={keyword.id} style={{ marginRight: 4 }}>
              {keyword.keyword}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    header: '',
    accessorKey: 'action',
    minSize: 50,
    maxSize: 100,
    cell: ({ row }) => (
      <div className="flex place-content-end items-center gap-2">
        <ModifySpecialization specialization={row.original} />
        <DeleteSpecialization specialization={row.original} />
      </div>
    ),
  },
];

export default columns;
