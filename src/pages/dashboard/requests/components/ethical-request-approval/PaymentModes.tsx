import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function PaymentModes({ onSubmit }: { onSubmit: () => void}) {
    const [dialogOpen, setDialogOpen] = useState(true);
    return (
        <>
            <div className="border-[#0E0F0C1F] border-b max-w-[800px] flex justify-between items-center text-[#040C21] w-full">
                <p className="pb-4 px-[1.125rem] font-semibold">
                Mode of Payment
                </p>
            </div>
            <div className="mx-auto w-full max-w-[390px] flex flex-col items-center gap-2.5">
            {["Online", "Offline"].map((mode) => (
                <>
                    <AlertDialog open={mode === "offline" && dialogOpen} onOpenChange={(open) => {setDialogOpen(open);
                                    if (!open && mode === "offline") {
                                        setTimeout(() => onSubmit(), 2000); // Delay before submit after dialog closes
                                    }
                                    }}>
                        <AlertDialogTrigger asChild >
                            <button  className="w-full text-center py-[1.875rem] px-4 bg-[#F1F5F9] rounded-md font-medium text-[#515152]"
                             onClick={() => {
                                if (mode === "online") {
                                    onSubmit(); // Trigger onSubmit for online mode
                                } else {
                                    null
                                }}}
                                >{mode}</button>
                        </AlertDialogTrigger>
                        {mode === "offline" ? 
                            <AlertDialogContent className="w-full py-5 px-4"  >
                                <div className="flex flex-col gap-8 justify-start">
                                    <AlertDialogHeader className="text-lg font-semibold">Offline Payment</AlertDialogHeader>
                                    <AlertDialogDescription className="text-center text-sm text-[#454745]">
                                        Please ensure all data is inputted correctly before making payments
                                    </AlertDialogDescription>
                                </div>
                            </AlertDialogContent>
                            :
                            ""
                        }
                        
                    </AlertDialog>
                </>
                
            ))}

            </div>
        </>
    )
}