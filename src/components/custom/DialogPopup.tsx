import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import AddIcon from "./Icons/AddIcon";


export default function DialogPopup({children}: {children: ReactNode}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex gap-4 items-center justify-center py-3 px-6"><span><AddIcon /></span>Create specialization</Button>
            </DialogTrigger>
            {children}
        </Dialog>
    )
}