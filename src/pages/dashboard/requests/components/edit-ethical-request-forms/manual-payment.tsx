/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/custom/CustomFormField";
import { useEthicalRequestStore } from "@/store/ethicalRequestStore";
import { Form } from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ArrowLeft from "@/components/custom/Icons/ArrowLeft";
import HoverCancel from "@/components/custom/Icons/HoverCancel";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

type Props = {
  handleNext: () => Promise<void>;
};

const MAX_FILE_SIZE = 3000000; // 3MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/gif",
];

const formSchema = z.object({
  evidence_of_payment: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must not exceed ${MAX_FILE_SIZE / 1000000} MB`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Unsupported file type"
    ),
});

const ManualPayment = ({ handleNext }: Props) => {
  const { data, setData } = useEthicalRequestStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { evidence_of_payment: null },
  });

  const {
    formState: { isValid, errors },
  } = form;

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      // Update the store data
      setData({
        ...data,
        evidence_of_payment: {
          evidence_of_payment: values.evidence_of_payment,
        },
      });

      // Wait for a small delay to ensure store is updated
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Close the sheet
      setOpen(false);

      // Proceed to next step
      await handleNext();
    } catch (error) {
      console.error("Error submitting payment evidence:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="w-full md:max-w-[12.5rem] py-3 px-6 rounded-1 text-white font-semibold flex md:justify-between items-center">
            <span>Make Payment</span>
            <span>
              <ArrowLeft />
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          onInteractOutside={() => setOpen(false)}
          side={isMobile ? "bottom" : "top"}
          className={` ${
            isMobile
              ? "inset-x-auto inset-y-0"
              : " inset-y-auto rounded-3xl md:!pb-12 md:!pt-0"
          } mx-auto w-full overflow-y-hidden px-2 focus-visible:outline-none md:max-w-[30rem]`}
        >
          <SheetClose className="absolute right-6 mx-auto flex w-fit rounded-full !px-0 py-0 opacity-70 transition-opacity hover:bg-[#14155E14] hover:opacity-100 focus:outline-none disabled:pointer-events-none">
            <HoverCancel />
          </SheetClose>
          <div className="flex h-full w-full flex-col gap-[2.5rem] border-none md:max-h-[26.5rem]">
            <div className="w-full antialiased flex flex-col gap-6">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl2 font-semibold pt-5 pb-5 md:py-2">
                  Upload Receipt
                </h1>
                <p>Please upload the evidence of your payment</p>
              </div>
              <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-8"
                  >
                    <CustomFormField
                      name="evidence_of_payment"
                      control={form.control}
                      label="Payment Receipt"
                      labelClassName="!font-semibold !text-black"
                      fieldType={FormFieldType.UPLOAD}
                      required
                      error={errors.evidence_of_payment?.message}
                    />
                    <Button
                      variant={isValid ? "default" : "ghost"}
                      type="submit"
                      disabled={!isValid}
                      className="my-4 focus:outline-none"
                    >
                      {loading ? "Please wait..." : "Submit"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ManualPayment;
