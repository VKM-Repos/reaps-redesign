import { KeywordItems, SpecializationItems } from "@/types/specialization";
import type { ColumnDef } from "@tanstack/react-table";
import ModifySpecialization from "../../edit-specializations";
import DeleteSpecialization from "./delete-specialization";
import { Badge } from "@/components/ui/badge";

const columns: Array<ColumnDef<SpecializationItems>> = [
  {
    header: "Specialization",
    accessorKey: "title",
  },
  {
    header: "Keywords",
    accessorKey: "keywords",
    cell: ({ row }) => {
      const { keywords } = row.original;
      return (
        <div className="flex gap-1">
          {keywords.map((keyword: KeywordItems) => (
            <span key={keyword.id} style={{ marginRight: 4 }}>
              <Badge className="w-fit text-black flex items-center justify-center gap-1 bg-[#192C8A1A] capitalize hover:bg-[#192C8A1A]">
                {keyword.keyword}
              </Badge>
            </span>
          ))}
        </div>
      );
    },
  },
  {
    header: "",
    accessorKey: "action",
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
