import { useTemplateStore } from "@/store/templates-store"
import RedFile from "@/assets/red-file.svg"
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import View from "@/components/custom/Icons/View";
import Delete from "@/components/custom/Icons/Delete";
import Pdf from "@/components/custom/PdfViewer";

export default function UploadedTemplates({ imagePreview }: { imagePreview: string}) {
    return (
        <div className="flex flex-col md:flex-row gap-5 w-full">
            <UploadedTemplate imagePreview={imagePreview}/>
        </div>
    )
}

const UploadedTemplate = ({ imagePreview }: { imagePreview: string}) => {
    const { data } = useTemplateStore();
    const { template_name, template } = data;
    console.log(imagePreview)
    // const [ previewUrl, setPreviewUrl ] = useState('');

    // const handlePreview = () => {
    //     if (template && template.type.startsWith('image/')) {
    //         const preview = URL.createObjectURL(template);
    //         setPreviewUrl(preview);
    //     } else {
    //         setPreviewUrl('');
    //     }
    // }

    // useEffect(() => {
    //     handlePreview();
    //     return () => {
    //         if (previewUrl) {
    //             URL.revokeObjectURL(previewUrl);
    //         }
    //     };
    // }, [template])

    return (
        <div className="py-5 px-[0.625rem] bg-[#F2F5F9] rounded-2xl">
            <div className="py-3 flex justify-between">
                <div className="flex gap-3">
                    <img src={RedFile} />
                    <p className="">{template_name}</p>
                   
                </div>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="rotate-90">
                        <MoreIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
                        <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
                        <>
                                <Dialog>
                                <DialogTrigger
                                    className={`text-black flex justify-center items-center gap-2 p-3`}
                                >
                                    <View />
                                    <span>View</span>
                                </DialogTrigger>
                                <DialogContent>
                                    <Pdf pdfUrl={imagePreview} />
                                </DialogContent>
                                
                                </Dialog>
                            <Dialog>
                            <DialogTrigger
                                className={`text-black flex justify-center items-center gap-2 p-3`}
                            >
                                {/* <SignatureIcon /> */}
                                <span>Change</span>
                            </DialogTrigger>
                            </Dialog>
                            <div  className={`text-black flex justify-center items-center gap-2 p-3`}>
                                <Delete />
                                <span>Delete</span>
                            </div>
                        </>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                    </DropdownMenu>
            </div>
            <div className="h-full max-h-[13.25rem] w-full">
                <Pdf pdfUrl={imagePreview} />
            </div>
        </div>
    )
}