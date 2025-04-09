import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddIcon from "@/components/custom/Icons/AddIcon";
import { useRef } from "react";

export function AddUserButton() {
  const closeDialogBtn = useRef<HTMLButtonElement | null>(null);

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
      <DialogContent className="w-[50%] overflow-y-scroll h-full max-h-[90%] my-auto p-12 no-scrollbar bg-white ">
        <div className="">
          <h2 className="text-center text-xl2 font-semibold font-inter">
            Add User
          </h2>
          <p className="text-sm text-center">Enter details to create user</p>

          <div className=""></div>

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
