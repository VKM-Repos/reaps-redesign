/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const formSchemas = {
  "Per submission": z.object({
    taxType: z.string().min(1, "Required"),
    taxRate: z.string().min(1, "Required"),
  }),
  Monthly: z.object({
    subscriptionDate: z.string().min(1, "Required"),
    gracePeriod: z.string().min(1, "Required"),
  }),
  Yearly: z.object({
    subscriptionDate: z.string().min(1, "Required"),
    gracePeriod: z.string().min(1, "Required"),
  }),
};

type FormSchemaType = {
  "Per submission": z.infer<(typeof formSchemas)["Per submission"]>;
  Monthly: z.infer<(typeof formSchemas)["Monthly"]>;
  Yearly: z.infer<(typeof formSchemas)["Yearly"]>;
};

const SelectPaymentModel = () => {
  const payment_models = ["Per submission", "Monthly", "Yearly"];
  const [selectedModel, setSelectedModel] = useState<string>("");

  const form = useForm<FormSchemaType[keyof FormSchemaType]>({
    resolver: zodResolver(
      formSchemas[selectedModel as keyof typeof formSchemas] || z.object({})
    ),
    defaultValues: {} as FormSchemaType[keyof FormSchemaType],
  });

  function onSubmit(values: any) {
    console.log("Form submitted:", values);
    toast({
      description: JSON.stringify(values, null, 2),
    });
  }

  return (
    <div className="w-full space-y-6">
      <div className="w-full flex items-center justify-between">
        <Label>Payment Model</Label>
        <div className="w-full max-w-[478px] flex flex-col text-xs mt-2">
          <Select
            key={selectedModel}
            onValueChange={(value: string) => setSelectedModel(value)}
          >
            <SelectTrigger className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]">
              <SelectValue
                placeholder={selectedModel || "Select a payment model"}
              />
            </SelectTrigger>
            <SelectContent className="z-[5000]">
              <SelectGroup>
                {payment_models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedModel && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border rounded-lg p-6 flex flex-col gap-4"
          >
            {selectedModel === "Per submission" && (
              <>
                <FormField
                  name="taxType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center justify-between">
                      <Label>Tax Type</Label>
                      <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]">
                            <SelectValue placeholder="Select tax type" />
                          </SelectTrigger>
                          <SelectContent className="z-[5000]">
                            <SelectGroup>
                              <SelectItem value="fixed">Fixed</SelectItem>
                              <SelectItem value="percentage">
                                Percentage
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="taxRate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center justify-between">
                      <Label>Tax Rate</Label>
                      <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                        <FormControl>
                          <Input
                            className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]"
                            {...field}
                            placeholder="Enter tax rate"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            {(selectedModel === "Monthly" || selectedModel === "Yearly") && (
              <>
                <FormField
                  name="subscriptionDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center justify-between">
                      <Label>Subscription Date</Label>
                      <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                        <FormControl>
                          <Input
                            className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]"
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="gracePeriod"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center justify-between">
                      <Label>Grace Period</Label>
                      <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                        <FormControl>
                          <Input
                            className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]"
                            {...field}
                            placeholder="Enter grace period"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex justify-end gap-4 mt-4">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedModel("")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SelectPaymentModel;
