/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import { CustomCell } from "@/components/custom/CustomTable";
import Action from "./action";

const columns: Array<ColumnDef<any>> = [
  {
    header: () => (
      <CustomCell
        value={"First Name"}
        className="font-bold w-full min-w-[6rem] "
      />
    ),
    accessorKey: "first_name",
    cell: (info) => (
      <CustomCell
        value={info?.getValue()}
        className="min-w-[6rem] truncate text-ellipsis whitespace-nowrap "
      />
    ),
  },
  {
    header: () => (
      <CustomCell
        value={"Last Name"}
        className="font-bold w-full min-w-[6rem] "
      />
    ),
    accessorKey: "last_name",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[6rem] whitespace-nowrap "
      />
    ),
  },
  {
    header: () => (
      <CustomCell value={"Email"} className="font-bold w-full min-w-[10rem] " />
    ),
    accessorKey: "email",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[10rem] whitespace-nowrap "
      />
    ),
  },
  {
    header: () => (
      <CustomCell value={"Role"} className="font-bold w-full min-w-[6rem]" />
    ),
    accessorKey: "user_type",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[6rem] whitespace-nowrap "
      />
    ),
  },
  {
    header: () => (
      <CustomCell
        value={"Contact Number"}
        className="font-bold w-full min-w-[10rem]"
      />
    ),
    accessorKey: "phone_number",
    cell: (info) => (
      <CustomCell
        value={info.getValue()}
        className="min-w-[10rem] whitespace-nowrap "
      />
    ),
  },
  {
    accessorKey: "custom",
    header: () => <CustomCell value="" className="w-full md:max-w-[4rem]" />,
    meta: { cellType: "custom" },
    cell: ({ row }) => {
      const item = row.original.all;
      console.log(item);

      return (
        <CustomCell
          value={<Action />}
          className="flex justify-center items-center justify-self-center w-full md:max-w-[4rem]"
        />
      );
    },
  },
];

export default columns;
