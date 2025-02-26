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
import { Input } from "@/components/ui/input";
import { SheetClose } from "@/components/ui/sheet";

type Category = {
  price: number;
  description: string;
  category: string;
};

const FormSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  price: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().positive({ message: "Price must be a positive number." })
  ),
});

export function CategoryForm({
  details,
  onFormSubmission,
}: {
  details?: Category;
  onFormSubmission: (data: z.infer<typeof FormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: details?.description || "",
      category: details?.category || "",
      price: details?.price ?? undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmission)}
        className="w-full space-y-6 pb-5"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  maxLength={250}
                  placeholder="Enter description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5 justify-end">
          <SheetClose className="disabled:pointer-events-none">
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit">{details ? "Update" : "Add"}</Button>
        </div>
      </form>
    </Form>
  );
}
