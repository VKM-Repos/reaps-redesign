import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddIcon from "@/components/custom/Icons/AddIcon";
import { useRef } from "react";
import CreateInstitutionForm from "../forms/create-institution-form";

export function AddInstitutionButton({ refetch }: { refetch: () => void }) {
  const closeDialogBtn = useRef<HTMLButtonElement | null>(null);
  console.log(refetch);

  // const handleClosDialog = () => {
  //   refetch();
  //   closeDialogBtn.current?.click();
  // };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]">
          <span>
            <AddIcon />
          </span>
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[50%] overflow-y-scroll h-full no-scrollbar py-10">
        <div className="mt-12 px-7">
          <h2 className="text-center text-xl2 font-semibold font-inter">
            Add Institution
          </h2>
          <p className="text-sm text-center">
            Enter details to create admin account
          </p>
          <CreateInstitutionForm />
          <DialogClose asChild>
            <Button
              ref={closeDialogBtn}
              type="button"
              variant="ghost"
              className="hidden"
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
