import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { AccountForm } from "./AccountForm";
import Edit from "@/components/custom/Icons/Edit";

export default function CreateAccountDialog({
  action,
  accountDetails,
}: {
  action: string;
  accountDetails?: any;
}) {
  const closeDialogBtn = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const handleClosDialog = () => {
    closeDialogBtn.current?.click();
  };
  console.log(accountDetails, "accccc");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {action == "update" ? (
          <button>
            <Edit />
          </button>
        ) : (
          <Button variant={"default"}>Add New</Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(event) => event.preventDefault}
      >
        <div className="mt-14 px-10">
          <AccountForm
            accountDetails={accountDetails}
            handleClosDialog={handleClosDialog}
          />
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
