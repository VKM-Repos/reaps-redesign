import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRef, useState } from "react";
import { UserGradeForm } from "./UserGradeForm";

export function UserGradeDialog({ title }: { title: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const closeDialogBtn = useRef<HTMLButtonElement | null>(null);

  const handleClosDialog = () => {
    closeDialogBtn.current?.click();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>{title}</button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(event) => event.preventDefault}
      >
        <div className="mt-14 px-10">
          <h2 className="text-center font-semibold text-xl">{title} User</h2>
          <UserGradeForm handleClosDialog={handleClosDialog} action={title} />
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
