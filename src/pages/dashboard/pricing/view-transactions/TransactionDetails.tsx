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
import { useState } from "react"
import DocumentIcon from "@/components/custom/sidebar-icons/document-icon"
import Download from "@/components/custom/Icons/Download"
import { SheetClose, SheetContent } from "@/components/ui/sheet"
import { useMediaQuery } from "react-responsive"
import HoverCancel from "@/components/custom/Icons/HoverCancel"

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
        receipt: fileSchema.nullable() 
      });



export default function TransactionDetails({ transaction }: TransactionDetailsProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
      });

    const { formState: { isValid, errors } } = form;
    const { data, setReceipt } = useTransactionStore();
    const { receipt } = data;
    const [ showFile, setShowFile ] = useState(false);

    const handleDownload = () => {
      if (!receipt) {
        console.warn('No receipt file available to download.');
        return;
      }
      const fileURL = URL.createObjectURL(receipt);
  
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = receipt.name; 
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      URL.revokeObjectURL(fileURL);
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (values.receipt) {
              // console.log("Receipt file:", values.receipt);
              setReceipt(values.receipt); 
              setShowFile(true);
            } else {
              console.warn("No receipt file provided."); 
            }
          } catch (error) {
            console.error("Error submitting form:", error); 
          }
    }

    
    return (
      <TransactionWrapper>
    <div className="border-[#0E0F0C1F] border-b flex justify-between items-center text-[#040C21] w-full">
        <p className="pb-4 px-[1.125rem] font-semibold text-xl2">Transaction Details</p>
    </div>
    <div className="w-full flex flex-col gap-4">
        <div className="w-full max-w-[85%] md:max-w-[95%] mx-auto my-0 border border-[#0E0F0C1F] rounded-[1.25rem] flex flex-col md:flex-row gap-[3rem] md:gap-0 justify-between p-5 md:p-[1.75rem]">
            <div className="flex flex-col gap-2 text-sm justify-center text-[#515152]">
                <p className="text-bold font-semibold">Name of Researcher</p>
                <p className="text-[#868687]">Academic - Undergraduates</p>
            </div>
            <div className="flex flex-col gap-2 text-sm justify-center text-[#515152]">
                <p className="text-bold font-semibold">Category</p>
                <p className="text-[#868687]">Academic - Undergraduates</p>
            </div>
            <div className="flex flex-col gap-2 text-sm justify-center text-[#515152]">
                <p className="text-bold font-semibold">Amount</p>
                <p className="text-[#868687]">{transaction.amount}</p>
            </div>
            
        </div>
        <div className="w-full max-w-[85%] md:max-w-[95%] mx-auto my-0 border border-[#0E0F0C1F] text-[#868687] rounded-[1.25rem] flex flex-col gap-5 md:p-[1.75rem] p-5">
            <div className="font-semibold">
                <p>Details</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]"><p className="font-bold">Transaction Reference</p><p>{transaction.reference}</p></div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 text-sm items-start md:items-center text-[#515152]"><p className="font-bold">Request ID</p><p>{transaction.id}</p></div>
            <div className="flex gap-5 text-sm items-center text-[#515152]"><p className="font-bold">Status</p>
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
        <div className="w-full max-w-[85%] md:max-w-[95%] mx-auto my-0 border border-[#0E0F0C1F] rounded-[1.25rem] flex flex-col gap-5 p-5 md:p-[1.75rem]">
            <div className="font-semibold text-[#868687] flex flex-col gap-5">
                <p>Document</p>
                <div>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 w-full">
                    
                      {showFile ?
                        <div className="flex flex-col gap-3 w-full max-w-[374px] md:max-w-[526px]">
                          <div className="flex justify-between flex-col gap-1 md:gap-5 md:flex-row">
                            <p className="font-semibold text-sm flex gap-1"><span className="text-black">Remita Payment Receipt</span><span className="text-red-500">*</span></p>
                            <p className="text-sm font-normal text-[#868687]">.Doc, .Docx, .Pdf (Max of 3MB)</p>
                          </div>
                          <div className="w-full py-2 px-3 rounded-[.5rem] border border-[#0C0C0F29] flex justify-between items-center">
                            <div className="gap-6 flex items-center text-black">
                              <DocumentIcon />
                              <p className="text-sm text-[#515152]">Remita Receipt </p>
                            </div>
                            <div><button className="text-black" onClick={handleDownload}><Download /></button></div>
                          </div>
                        </div>
                          : 
                        <div className="flex flex-col items-start md:flex-row md:items-center gap-4 w-full">
                          <div className="grow w-full">
                          {/* onsubmit, retrieve path, set state,  render new div */}
                            <CustomFormField
                              key={transaction.id} 
                              name="receipt" 
                              error={(errors.receipt as any)?.[transaction.id] as FieldError | undefined} 
                              control={form.control}
                              label="Remita Payment Receipt"
                              labelClassName="!font-semibold !text-black"
                              fieldType={FormFieldType.UPLOAD}
                              required={true}
                              />
                          </div>
                          <div className={`flex flex-col items-center self-start md:self-end`}>
                            <Button variant={isValid ? "default" : "ghost"} type="submit" className="focus:outline-none">
                              Submit
                            </Button>
                          </div>
                        </div>
                      }
                      
                
                      
                    </form>
                        
                    </Form>
                </div>
                
                    {/* configure label to receive either remita or paystack */}
            </div>
        </div>
    </div>
      </TransactionWrapper>
        
    )
}

function TransactionWrapper({ children }: {children: React.ReactNode}) {
  const isMobile = useMediaQuery({query: '(max-width: 767px)'});

  return (
    <>
    {isMobile ? 
      <SheetContent className="w-full h-full  pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4">
         <SheetClose className="absolute right-6 top-6 !w-fit mx-auto py-0 px-0 ml-4 flex items-center justify-start opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
        {children}
      </SheetContent>
      :
      <DialogContent className="w-full max-w-[800px] h-full md:max-h-[650px] pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4 rounded-[1.25rem]">
        {children}
      </DialogContent>
    }
      </>

  )
}