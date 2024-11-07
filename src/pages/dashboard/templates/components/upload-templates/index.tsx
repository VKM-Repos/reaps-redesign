import { useTemplateStore } from "@/store/templates-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import PdfImage from "@/assets/document-pdf-image.png";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    file_name: z.string().min(1, {message: "Please add the file name"}),
    template: z.instanceof(File, { message: "Please upload a file" }).nullable()
})
export default function UploadTemplate() {
    const [uploadProgress, setUploadProgress] = useState(0);
    const { setTemplate, setTemplateName, setLoading } = useTemplateStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
      });

    const { register, formState: {isValid, errors}, setValue } = form;

    const simulateUpload = () => {
        setUploadProgress(0); 

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 10; 
            });
        }, 300);
    };



    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try{
            setTimeout(() => {
                if (values.template) {
                    setTemplateName(values.file_name)
                    setTemplate(values.template)
                } 
                setLoading(false);
            }, 3000);
            
        } catch(error) {
            console.error("Error during submission:", error);
        }
    }

    return (
        <>
            <div className="w-full mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 items-center">
                        <div className="w-full">
                            <FormInput
                                label="File Name"
                                {...register("file_name", {
                                    required: "This field is required",
                                })}
                            />
                        </div>
                        
                        <FormControl>
                            <div className="flex flex-col gap-[2.5rem] w-full">
                                <div className="flex flex-col gap-2">
                                <div className={`w-full h-full max-h-[10.625rem] border border-dashed rounded-lg pt-[2.375rem] pb-4 ${errors.template ? "border-red-500" : "border-[#BBBBBB]"}`}>
                                <Dropzone
                                    accept={{
                                        "application/pdf": [".pdf"]
                                    }}
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        const file = acceptedFiles[0];
                                        if (file) {
                                            setValue("template", file, { shouldValidate: true });
                                            // const url = URL.createObjectURL(file);
                                            simulateUpload();
                                        }
                                    }}
                                >
                                    {({ getInputProps, getRootProps }) => (
                                        <div {...getRootProps()} className="cursor-pointer border-dashed border-[#BBBBBB]">
                                            <input {...getInputProps()} className="!w-full " />
                                            
                                                <div className="flex flex-col items-center gap-2 mx-auto  w-full">
                                                    <img src={PdfImage} alt="Document Pdf Icon"/>
                                                    <div>
                                                        <p className="font-semibold text-sm text-black">Drop documents here, or <span className="text-[#8C8C8C] text-sm font-normal">browse</span></p>
                                                        <p className="text-[#8C8C8C] text-sm">Supports: PDF only</p>
                                                    </div>
                                                </div>
                                            
                                        </div>
                                    )}
                                </Dropzone>
                                </div>
                                {errors.template && <p className="text-xs text-red-500 font-semibold">Please upload a file</p>}
                                </div>
                                <div className="border-[0.5px] w-full flex flex-col py-2 px-[.875rem] rounded-lg border-[#D7D7D7]">
                                    <p className="text-xs">Uploading...</p>
                                    <div className="flex flex-col items-start gap-2"><p className="text-xs">{uploadProgress}%</p><p className="text-xs">&nbsp;</p></div>
                                </div>
                               
                            </div>
                        </FormControl>
                        <div className="flex w-full justify-end gap-3">
                            <SheetClose><Button type="button" variant="ghost" className="!py-3 !px-6 rounded">Cancel</Button></SheetClose>
                            <SheetClose>
                                <Button variant={isValid ? "default" : "ghost"} type="submit" className="!py-3 !px-6 rounded">Finish</Button>
                            </SheetClose>
                        </div>
                    </form>
                    
                </Form>

            </div>
        </>
    )
}