import { KeywordItems, SpecializationItems } from "@/types/specialization";
import type { ColumnDef } from "@tanstack/react-table";
import ModifySpecialization from "../../edit-specializations";
import DeleteSpecialization from "./delete-specialization";
import { Badge } from "@/components/ui/badge";
import { CustomCell } from "@/components/custom/CustomTable";

const columns: Array<ColumnDef<SpecializationItems>> = [
  {
    header: () => (
      <CustomCell
        value={"Specialization"}
        className="font-bold w-full min-w-[18rem]"
      />
    ),
    accessorKey: "title",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[18rem] w-full overflow-x-hidden"
      />
    ),
  },
  {
    header: () => (
      <CustomCell
        value={"Keywords"}
        className="font-bold w-full min-w-[18rem]"
      />
    ),
    accessorKey: "keywords",
    cell: ({ row }) => {
      const { keywords } = row.original;
      return (
        <div className="w-full flex gap-1 min-w-[18rem]">
          {keywords.map((keyword: KeywordItems) => (
            <span className="flex" key={keyword.id}>
              <Badge className="w-fit text-black flex items-center justify-center gap-1 bg-[#192C8A1A] capitalize hover:bg-[#192C8A1A] whitespace-nowrap">
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
      <div className="flex place-content-end items-center gap-4">
        <ModifySpecialization specialization={row.original} />
        <DeleteSpecialization specialization={row.original} />
      </div>
    ),
  },
];

export default columns;
