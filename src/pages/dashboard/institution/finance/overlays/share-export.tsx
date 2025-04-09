import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import OptionsIcon from '@/assets/more-horizontal-circle-01.svg';
import ExportIcon from '@/assets/link-square-02.svg';
import ShareIcon from '@/assets/share-08.svg';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ShareExportPopover() {
    return (
       <Popover>
        <PopoverTrigger>
            <button><img src={OptionsIcon} alt="Horizontal more icon"/></button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[8rem] rounded-xl rounded-tr-none px-1 shadow-lg flex flex-col">
            <button className="flex gap-2 items-center p-3">
                <img src={ExportIcon} alt="Export icon" />
                <span>Export</span>
            </button>
            <ShareDialog />
        </PopoverContent>
       </Popover>
    )
};

export const emailSchema = z.object({
    email: z
      .string()
      .nonempty("This field is required")
      .transform((val) => val.split(",").map((e) => e.trim()))
      .refine(
        (emails) => Array.isArray(emails) && emails.every((email) => z.string().email().safeParse(email).success),
        {
          message: "One or more emails are invalid",
        }
      ),
  });

function ShareDialog() {
    const [open, setOpen] = useState(false);
    const form = 
        useForm<z.infer<typeof emailSchema>>({
            resolver: zodResolver(emailSchema),
    });

    const { register, handleSubmit, reset, formState } = form;
    const onSubmit = (values: z.infer<typeof emailSchema>) => {
        console.log(values.email);
        setOpen(false);
        reset();
    }

    return (      
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <button className="flex gap-2 items-center p-3">
                    <img src={ShareIcon} alt="Share Icon" />
                    <span>Share</span>
                </button>
            </DialogTrigger>
            <DialogContent className='w-[37.5rem] p-[1.875rem] flex flex-col gap-10 justify-center'>
                <div className="flex flex-col gap-[.625rem] justify-center">
                    <DialogHeader>
                        <DialogTitle className="text-[1.625rem] font-bold">Share</DialogTitle>
                        {/* Monthly Payments and institution would possibly be passed as prop */}
                        <DialogDescription>University of Abuja Monthly Payment</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="gap-[2.375rem] flex flex-col justify-center">
                            <FormInput
                                label="Enter recipient's email address"
                                placeholder="Use a comma to add another email"
                                {...register("email", {
                                required: "This field is required",
                                })}
                            />
                            <div className="w-full flex justify-end">
                                <Button type='submit' variant={formState.isValid ? 'default' : 'ghost'} className="justify-self-end max-w-[3.5rem]">Send</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}