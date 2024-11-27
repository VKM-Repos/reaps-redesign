import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGET } from "@/hooks/useGET.hook";
import SearchIcon from "@/components/custom/Icons/Search";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const FormSchema = z.object({
  reviewer_id: z.string({
    required_error: "Please select a rviewer.",
  }),
});

export function ReviewersList() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { data: reviewers, isPending } = useGET({
    url: "users?user_type=reviewer",
    queryKey: ["GET_USERS_IN_ASSIGN_REVIEW_PAGE"],
  });
  const reviewer = reviewers?.items.find(
    (reviewer: any) => reviewer.id === form?.getValues().reviewer_id
  );

  const reviewerName = reviewer
    ? `${reviewer.first_name} ${reviewer.last_name}`.trim()
    : "Select Reviewer...";
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, "??????");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-5 items-center"
      >
        <FormField
          control={form.control}
          name="reviewer_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[400px] justify-between py-6",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? reviewerName : "Select Reviewer..."}
                      <SearchIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Reviewer..." />
                    <CommandList>
                      <CommandEmpty>No reviewer found.</CommandEmpty>
                      <CommandGroup>
                        {reviewers?.items.map((reviewer: any) => (
                          <CommandItem
                            key={reviewer.id}
                            value={reviewer?.id}
                            onSelect={() => {
                              form.setValue("reviewer_id", reviewer.id);
                            }}
                          >
                            {reviewer.first_name} {reviewer.last_name}
                            <Check
                              className={cn(
                                "ml-auto",
                                reviewer.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="py-6 rounded-lg">
          Submit
        </Button>
      </form>
    </Form>
  );
}
