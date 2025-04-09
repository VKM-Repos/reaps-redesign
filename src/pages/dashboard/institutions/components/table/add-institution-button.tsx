import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddIcon from "@/components/custom/Icons/AddIcon";
import CreateInstitutionForm from "../forms/create-institution-form";

export function AddInstitutionButton() {
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
      <DialogContent className="w-[50%] overflow-y-scroll h-auto max-h-[90%] my-auto p-12 no-scrollbar bg-white ">
        <div className="">
          <h2 className="text-center text-xl2 font-semibold font-inter">
            Add Institution
          </h2>
          <p className="text-sm text-center">
            Enter details to create admin account
          </p>
          <CreateInstitutionForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
