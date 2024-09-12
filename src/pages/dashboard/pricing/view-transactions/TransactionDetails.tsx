import { DialogContent } from "@/components/ui/dialog"
import { statusColorMap } from "."
import { Badge } from "@/components/ui/badge"
import CustomFormField, { FormFieldType } from "@/components/custom/CustomFormField"
import { FieldError, useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useTransactionStore } from "@/store/TransactionStore"

type TransactionDetailsProps = {
    transaction: {
        reference: string,
        id: string,
        date: string,
        status: string,
        amount: string
    }
}
    const MAX_FILE_SIZE = 3000000;
    const ACCEPTED_FILE_TYPES = [
      "application/pdf", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    const fileSchema = z
      .instanceof(File, { message: "Please upload a file" })
      .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 3MB.")
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file.type),
        "Only .doc, .docx, and .pdf formats are supported."
      );

      const formSchema = z.object({
        receipt: fileSchema.optional(), 
      });



export default function TransactionDetails({ transaction }: TransactionDetailsProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
      });

    const { formState: { isValid, errors } } = form;
    const { setReceipt } = useTransactionStore();

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (values.receipt) {
              setReceipt(values.receipt); // Only call setReceipt if receipt is defined
            } else {
              console.warn("No receipt file provided."); // Handle the case where no receipt is provided
            }
          } catch (error) {
            console.error("Error submitting form:", error); // Provide an error message
          }
    }

    
    return (
        <DialogContent className="w-full max-w-[800px] h-full max-h-[700px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4 rounded-[1.25rem]">
             <div className="border-[#0E0F0C1F] border-b  flex justify-between items-center text-[#040C21] w-full">
                <p className="pb-4 px-[1.125rem] font-semibold text-xl2">Transaction Details</p>
            </div>
            <div className="w-full flex flex-col gap-4">
                <div className="w-full max-w-4/5 border-[#0E0F0C1F] rounded-[1.25rem] flex gap-5 p-[1.75rem]">
                    <div className="flex flex-col gap-1 text-sm justify-center text-[#515152]">
                        <p className="text-bold">Name of Researcher</p>
                        <p className="text-[#868687]">Academic - Undergraduates</p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm justify-center text-[#515152]">
                        <p className="text-bold">Category</p>
                        <p className="text-[#868687]">Academic - Undergraduates</p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm justify-center text-[#515152]">
                        <p className="text-bold">Amount</p>
                        <p className="text-[#868687]">{transaction.amount}</p>
                    </div>
                    
                </div>
                <div className="w-full max-w-4/5 border-[#0E0F0C1F] rounded-[1.25rem] flex flex-col gap-5 p-[1.75rem]">
                    <div className="font-semibold text-[#868687]">
                        <p>Details</p>
                    </div>
                    <div className="flex gap-5 "><p className="font-bold">Transaction Reference</p><p>{transaction.reference}</p></div>
                    <div className="flex gap-5 "><p className="font-bold">Request ID</p><p>{transaction.id}</p></div>
                    <div className="flex gap-5 "><p className="font-bold">Status</p>
                        <Badge
                          style={{
                            color: statusColorMap[transaction.status]?.text || '#000000',
                            backgroundColor: statusColorMap[transaction.status]?.bg || '#192C8A',
                          }}
                          className="flex gap-1 items-center justify-center py-1 px-2 rounded-[2.25rem] font-[400]"
                        >
                          <div
                            style={{
                              backgroundColor: statusColorMap[transaction.status]?.text || '#192C8A',
                            }}
                            className="w-[5px] h-[5px] rounded-full "
                          ></div>
                          {transaction.status}
                        </Badge>
                    </div>
                </div>
                <div className="w-full max-w-4/5 border-[#0E0F0C1F] rounded-[1.25rem] flex flex-col gap-5 p-[1.75rem]">
                    <div className="font-semibold text-[#868687]">
                        <p>Document</p>
                        <div>
                            <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 w-full">
                              <div className="grow">
                                <CustomFormField
                                  key={transaction.id} 
                                  name={`file.${transaction.id}`} 
                                  error={(errors.receipt as any)?.[transaction.id] as FieldError | undefined} 
                                  control={form.control}
                                  label="Remita Payment Receipt"
                                  fieldType={FormFieldType.UPLOAD}
                                  required={true}
                                  />
                              </div>
                                <Button variant={isValid ? "default" : "ghost"} type="submit" className={`focus:outline-none mt-[1.875rem]`}>Submit</Button>
                            </form>
                               
                            </Form>
                        </div>
                       
                            {/* configure label to receive either remita or paystack */}
                    </div>
                </div>
            </div>

        </DialogContent>
    )
}