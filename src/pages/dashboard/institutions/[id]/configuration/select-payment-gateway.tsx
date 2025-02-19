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
import PAYSTACK_LOGO from "/img/paystack_logo.png";
import REMITTA_LOGO from "/img/remita_logo 1.png";

const bankOptions = [
  "GTBank",
  "Access Bank",
  "Zenith Bank",
  "UBA",
  "First Bank",
];

const formSchemas = {
  paystack: z.object({
    bank: z.string().min(1, "Required"),
    accountNumber: z.string().min(10, "Enter a valid account number"),
    accountName: z.string().optional(),
  }),
  remitta: z.object({
    bank: z.string().min(1, "Required"),
    accountNumber: z.string().min(10, "Enter a valid account number"),
    accountName: z.string().optional(),
    apiKey: z.string().min(1, "Required"),
    merchantId: z.string().min(1, "Required"),
    serviceTypeId: z.string().min(1, "Required"),
  }),
};

type FormSchemaType = {
  paystack: z.infer<typeof formSchemas.paystack>;
  remitta: z.infer<typeof formSchemas.remitta>;
};

const SelectPaymentGateway = () => {
  const gateways = ["Paystack", "Remitta"];
  const [selectedGateway, setSelectedGateway] = useState<string>("");

  const form = useForm<FormSchemaType[keyof FormSchemaType]>({
    resolver: zodResolver(
      formSchemas[selectedGateway as keyof typeof formSchemas] || z.object({})
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
        <Label>Choose payment gateway</Label>
        <div className="w-full max-w-[478px] flex flex-col text-xs mt-2">
          <Select
            key={selectedGateway}
            onValueChange={(value: string) => setSelectedGateway(value)}
          >
            <SelectTrigger className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]">
              <SelectValue
                placeholder={selectedGateway || "Select a gateway"}
              />
            </SelectTrigger>
            <SelectContent className="z-[5000]">
              <SelectGroup>
                {gateways.map((gateway) => (
                  <SelectItem key={gateway} value={gateway}>
                    {gateway}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedGateway && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border rounded-[1.5rem] p-6 flex flex-col gap-4"
          >
            <>
              <picture>
                <img
                  className="h-[18px]"
                  src={
                    selectedGateway === "Paystack"
                      ? PAYSTACK_LOGO
                      : REMITTA_LOGO
                  }
                  alt="logo"
                />
              </picture>
              <FormField
                name="bank"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex items-center justify-between">
                    <Label>Bank</Label>
                    <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]">
                          <SelectValue placeholder="Select a bank" />
                        </SelectTrigger>
                        <SelectContent className="z-[5000]">
                          {bankOptions.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {bank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="accountNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex items-center justify-between">
                    <Label>Account number</Label>
                    <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                      <FormControl>
                        <Input
                          className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]"
                          {...field}
                          placeholder="Enter account number"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="accountName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full flex items-center justify-between">
                    <Label>Account name</Label>
                    <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                      <FormControl>
                        <Input
                          className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]"
                          {...field}
                          readOnly
                          placeholder="Auto-filled"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </>

            {selectedGateway === "Remitta" && (
              <>
                <FormField
                  name="apiKey"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center justify-between">
                      <Label>API key</Label>
                      <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                        <FormControl>
                          <Input
                            className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]"
                            {...field}
                            type="password"
                            placeholder="Enter API Key"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="merchantId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center justify-between">
                      <Label>Merchant ID</Label>
                      <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                        <FormControl>
                          <Input
                            className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]"
                            {...field}
                            placeholder="Enter Merchant ID"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="serviceTypeId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full flex items-center justify-between">
                      <Label>Service type ID</Label>
                      <div className="w-full max-w-[450px] flex flex-col text-xs mt-2">
                        <FormControl>
                          <Input
                            className="w-full mt-2 px-3 py-6 text-[#868687] font-normal border-[#868687] border-[1.5px]"
                            {...field}
                            placeholder="Enter Service Type ID"
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
                onClick={() => setSelectedGateway("")}
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

export default SelectPaymentGateway;
