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
import { usePATCH } from "@/hooks/usePATCH.hook";
import { toast } from "@/components/ui/use-toast";
const FormSchema = z.object({
  user_type: z.string({
    required_error: "Please select user role.",
  }),
});

export function UserGradeForm({
  action,
  handleClosDialog,
  user,
}: {
  action: string;
  handleClosDialog: () => void;
  user: any;
}) {
  //   const closeDialogBtn = useRef<HTMLButtonElement | null>(null);
  //   const showConfirmation = useRef<HTMLButtonElement | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = usePATCH(`users/${user.id}/role`);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data, {
      onSuccess: () => {
        setConfirm(true);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to update user role.",
          variant: "destructive",
        });
        console.error(error);
      },
    });
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
            name="user_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {action == "Upgrade" && (
                      <SelectItem value="admin">Admin</SelectItem>
                    )}
                    {user.user_type == "admin" && action == "Downgrade" && (
                      <SelectItem value="reviewer">Reviewer</SelectItem>
                    )}
                    {user.user_type == "user" && action == "Upgrade" && (
                      <SelectItem value="reviewer">Reviewer</SelectItem>
                    )}
                    {action == "Downgrade" && (
                      <SelectItem value="user">Researcher</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center gap-5">
            <Button
              className=""
              onClick={handleClosDialog}
              type="button"
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                action
              )}
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogTrigger asChild>
          <button className="hidden">{action}</button>
        </DialogTrigger>
        <DialogContent
          className="w-fit "
          onInteractOutside={(event) => event.preventDefault}
        >
          <div className="flex flex-col items-center justify-center gap-5 mt-14 px-10 py-5">
            <h2 className="text-center font-semibold text-xl mb-2">{action}</h2>
            <span className="text-center text-sm">
              <span className="capitalize">{user.user_type}</span> (
              {user.first_name} {user.last_name}) have been {action}d to a{" "}
              {form.getValues("user_type")}
            </span>
            <DialogClose asChild>
              <Button onClick={handleClosDialog} type="button">
                Done
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
