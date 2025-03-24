/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { usePOST } from "@/hooks/usePOST.hook";

const paymentSchema = z.object({
  paymentType: z.enum(["manual", "online", "waiver"], {
    required_error: "Payment type is required",
  }),
});

type PaymentFormType = z.infer<typeof paymentSchema>;

interface SelectPaymentTypeProps {
  type?: "manual" | "online" | "waiver";
  context?: string;
}

const SelectPaymentType = ({
  type = "manual",
  context,
}: SelectPaymentTypeProps) => {
  const paymentTypes = ["manual", "online", "waiver"];
  const [selectedType, setSelectedType] = useState<string>(type);

  const form = useForm<PaymentFormType>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { paymentType: type },
  });

  useEffect(() => {
    form.reset({ paymentType: type });
    setSelectedType(type);
  }, [type, form]);

  const { mutate, isPending } = usePOST("payment-configs", {});

  function onSubmit(values: PaymentFormType) {
    mutate(
      {
        payment_type: values.paymentType,
        context: context,
      },
      {
        onSuccess: (data) => {
          toast({
            description: `Payment type created: ${data.payment_type}`,
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            description: "Failed to create payment type",
          });
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex items-center justify-between">
          <Label>Payment Type</Label>
          <div className="w-full max-w-[478px] flex flex-col text-xs mt-2">
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value: string) => {
                        setSelectedType(value);
                        field.onChange(value);
                      }}
                      value={selectedType}
                    >
                      <SelectTrigger className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]">
                        <SelectValue placeholder="Select a payment type" />
                      </SelectTrigger>
                      <SelectContent className="z-[5000]">
                        <SelectGroup>
                          {paymentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4 mt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SelectPaymentType;
