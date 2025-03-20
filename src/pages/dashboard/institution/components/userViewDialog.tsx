import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRef, useState } from "react";
import { UserGradeForm } from "./UserGradeForm";
import { UserActivationForm } from "./UserActivationForm";

export function UserViewDialog({
  title,
  user,
  refetch,
}: {
  title: string;
  user: any;
  refetch: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const closeDialogBtn = useRef<HTMLButtonElement | null>(null);

  const handleClosDialog = () => {
    refetch();
    closeDialogBtn.current?.click();
  };
  console.log(user, "/////");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button">View</button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(event) => event.preventDefault}
      >
        <div className="mt-14 px-10">
          <h2 className="text-center font-semibold text-[26px]">
            {user.first_name} {user.last_name}
          </h2>{" "}
          <h4 className="text-center text-[14px] text-[#515152]">
            User type:{user.user_type}
          </h4>
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
