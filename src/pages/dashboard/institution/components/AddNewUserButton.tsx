import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddIcon from "@/components/custom/Icons/AddIcon";
import { CreateUserForm } from "./CreateuserForm";
import { useEffect, useRef } from "react";

export function AddNewUserButton({
  refetch,
  action,
  user,
}: {
  action: string;
  refetch: () => void;
  user?: any;
}) {
  const closeDialogBtn = useRef<HTMLButtonElement | null>(null);

  const handleClosDialog = () => {
    refetch();
    closeDialogBtn.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {action === "new" ? (
          <Button className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]">
            <span>
              <AddIcon />
            </span>
            Add new
          </Button>
        ) : (
          <button type="button">View</button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[60%] overflow-y-scroll h-full no-scrollbar py-10">
        <div className="mt-12 px-7">
          {action === "new" ? (
            <h2 className="text-center text-xl2 font-semibold font-inter">
              Create New User
            </h2>
          ) : (
            <>
              <h2 className="text-center text-[26px] font-semibold font-inter">
                {user?.first_name} {user?.last_name}
              </h2>
              <h4 className="text-[#515152] text-[14px] font-semibold text-center mb-10">
                User type: {user?.user_type}
              </h4>
            </>
          )}
          <CreateUserForm
            user={user}
            action={action}
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
