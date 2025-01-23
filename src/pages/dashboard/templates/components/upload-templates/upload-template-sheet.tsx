import AddIcon from "@/components/custom/Icons/AddIcon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UploadTemplate from ".";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

type SheetProps = {
  refetch: () => void;
};
export default function UploadTemplateSheet({ refetch }: SheetProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isLarge = useMediaQuery({ query: "(max-width: 1100px)" });
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className={`flex gap-4 items-center justify-center py-3 px-6 ${
            isLarge ? "max-w-fit" : "max-w-[16.75rem]"
          }`}
        >
          <span>
            <AddIcon />
          </span>
          Upload
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "top"}
        className={` ${
          isMobile
            ? "inset-y-0 inset-x-auto"
            : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"
        } mx-auto px-2 md:max-w-[35rem] focus-visible:outline-none overflow-y-hidden`}
      >
        <div
          className={`h-full md:max-h-[31.5rem] border-none w-full flex flex-col gap-[2.5rem] rounded-2xl `}
        >
          <UploadTemplate action="create" refetch={refetch} setOpen={setOpen}/>
        </div>
      </SheetContent>
    </Sheet>
  );
}
