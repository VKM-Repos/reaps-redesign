import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddIcon from "@/components/custom/Icons/AddIcon";
import { CreateUserForm } from "./CreateuserForm";

export function AddNewUserButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]">
          <span>
            <AddIcon />
          </span>
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] overflow-y-scroll h-full">
        <div className="mt-12 px-7">
          <h2 className="text-center text-xl2 font-semibold font-inter">
            Create New User
          </h2>
          <CreateUserForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
