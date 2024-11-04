"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const FormSchema = z.object({
  role: z.string({
    required_error: "Please select user role.",
  }),
});

export function UserGradeForm({
  action,
  handleClosDialog,
}: {
  action: string;
  handleClosDialog: () => void;
}) {
  //   const closeDialogBtn = useRef<HTMLButtonElement | null>(null);
  //   const showConfirmation = useRef<HTMLButtonElement | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    handleClosDialog();
    setConfirm(true);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-6 py-5"
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Researcher" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">Reviewer</SelectItem>
                    <SelectItem value="m@google.com">Researcher</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center gap-5">
            <Button onClick={handleClosDialog} type="button" variant={"ghost"}>
              Cancel
            </Button>
            <Button type="submit">{action}</Button>
          </div>
        </form>
      </Form>
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogTrigger asChild>
          <button className="hidden">{action}</button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-md "
          onInteractOutside={(event) => event.preventDefault}
        >
          <div className="flex flex-col items-center justify-center gap-5 mt-14 px-10 py-5">
            <h2 className="text-center font-semibold text-xl mb-2">{action}</h2>
            <span className="text-center text-sm">
              Researcher (Mariam Catherine) have been upgraded to a Reviewer
            </span>
            <DialogClose asChild>
              <Button type="button">Done</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
