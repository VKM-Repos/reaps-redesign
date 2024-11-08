import RedFile from "@/assets/red-file.svg"
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import View from "@/components/custom/Icons/View";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DeleteSmallIcon from "@/components/custom/Icons/DeleteSmallIcon";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
import { useMediaQuery } from "react-responsive";
import { mock_templates } from "@/lib/helpers";
import { Viewer } from '@react-pdf-viewer/core';
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import UploadTemplate from "../upload-templates";
import { useTemplateStore } from "@/store/templates-store";
import { Skeleton } from "@/components/ui/skeleton";
import Cancel from "@/components/custom/Icons/Cancel";

export default function UploadedTemplates() {
    const [ templateArray, setTemplateArray ] = useState(mock_templates);
    return (
        <div className="flex flex-col md:flex-row flex-wrap gap-5 w-full">
            {templateArray.map((template) => (
                <div key={template.id} className="w-full md:max-w-[25.875rem]">
                    <UploadedTemplate item={template} setTemplateArray={setTemplateArray} templateName={template.name} templateUrl={template.file}/>
                </div> 
            ))}
            
        </div>
    )
}

const UploadedTemplate = (
    { item, setTemplateArray, templateName, templateUrl }: 
    { 
        item: any, 
        setTemplateArray: (template: any) => void, 
        templateName: string | undefined, 
        templateUrl: string
    }) => {

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const { setLoading } = useTemplateStore();
    const [isViewerLoading, setIsViewerLoading] = useState(false);

    function deleteTableItem(item: any) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setTemplateArray((prevTemplateArray: any) =>
            prevTemplateArray.filter((data: any) => data.id !== item.id)
          );
        }, 3000); 
    }

    useEffect(() => {
        if (item) {
            setIsViewerLoading(true);
            setTimeout(() => setIsViewerLoading(false), 4000); 
        }
    }, [item])

    return (
        <div className="w-full md:max-w-[25.875rem] py-5 px-[0.625rem] bg-[#F2F5F9] rounded-2xl hover:bg-[#E0E5EC] cursor-pointer">
            <div className="py-3 flex justify-between">
                <div className="flex gap-3">
                    <img src={RedFile} />
                    <p className="">{templateName}</p>
                   
                </div>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="rotate-90">
                        <MoreIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
                        <DropdownMenuGroup className="flex flex-col justify-center items-start">
                        <>
                                <Dialog>
                                <DialogTrigger
                                    className={`text-black flex justify-center items-center gap-2 p-3`}
                                >
                                    <View />
                                    <span>View</span>
                                </DialogTrigger>
                                <DialogContent className={` ${isMobile ? 'w-full h-full' : 'w-auto h-[95%]'}  mx-auto my-auto overflow-y-scroll scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1.5 scrollbar-thumb-gray-500`} showCloseButton={false}>
                                    {isMobile && <DialogClose className="fixed top-[2.5rem] right-[2rem] z-[100]"><Cancel /></DialogClose>}
                                    <div className={`${isMobile ? 'overflow-scroll' : ''} w-full mx-auto`}>
                                        {isViewerLoading ? (
                                                <Skeleton className="w-full h-[400px] rounded-lg" />
                                            ) : (
                                                <Viewer
                                                    initialPage={0}
                                                    defaultScale={1}
                                                    fileUrl={templateUrl}
                                                />
                                            )}
                                    </div>
                                   
                                </DialogContent>
                                
                                </Dialog>
                            <Sheet>
                                <SheetTrigger
                                    className={`text-black flex justify-center items-center gap-2 py-3 px-2`}

                                >
                                    <PencilEdit />
                                    <span>Change</span>
                                </SheetTrigger>
                                <SheetContent side={isMobile ? "bottom" : "top"} className={` ${isMobile ? "inset-y-0 inset-x-auto" : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"} w-full mx-auto px-2 md:max-w-[35rem] focus-visible:outline-none overflow-y-hidden z-[9999]`}>
                                    <div className={`h-full md:max-h-[31.5rem] border-none w-full flex flex-col gap-[2.5rem] rounded-2xl `}>
                                        <UploadTemplate templateName={item?.name} templateUrl={item?.file}/>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <Sheet>
                                <SheetTrigger className={`flex justify-center items-center gap-2 text-black ${isMobile ? 'p-2' : 'p-3'}`}>
                                    <DeleteSmallIcon />
                                    <span>Delete</span>
                                </SheetTrigger>
                                <RenderDeleteSheet text="Are you sure you want to delete this template?" data={item} deleteItem={deleteTableItem} />
                            </Sheet>
                        </>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                    </DropdownMenu>
            </div>
            <div className={`h-full max-h-[13.25rem] w-full md:max-w-[25.875rem] rounded-lg overflow-hidden`}>
                {isViewerLoading ? (
                    <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                    <Viewer initialPage={0} defaultScale={1} fileUrl={templateUrl} />
                )}
            </div>
        </div>
    )
}