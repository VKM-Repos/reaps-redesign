import RedFile from "@/assets/red-file.svg";
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import View from "@/components/custom/Icons/View";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DeleteSmallIcon from "@/components/custom/Icons/DeleteSmallIcon";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
import { useMediaQuery } from "react-responsive";
// import { mock_templates } from "@/lib/helpers";
// import { Viewer } from "@react-pdf-viewer/core";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import UploadTemplate from "../upload-templates";
import { Skeleton } from "@/components/ui/skeleton";
import Cancel from "@/components/custom/Icons/Cancel";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { getFileExtension } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/custom/Loader";
import { useDELETE } from "@/hooks/useDelete.hook";

export default function UploadedTemplates({
  templates,
  refetch,
}: {
  templates: any;
  refetch: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
      {templates?.items?.map((template: any) => (
        <div key={template.id} className="w-full md:max-w-[25.875rem]">
          <UploadedTemplate
            refetch={refetch}
            item={template}
            templateName={template.title}
            templateUrl={template.file_path}
          />
        </div>
      ))}
    </div>
  );
}

const UploadedTemplate = ({
  refetch,
  item,
  templateName,
  templateUrl,
}: {
  refetch: () => void;
  item: any;
  templateName: string | undefined;
  templateUrl: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isViewerLoading, setIsViewerLoading] = useState(false);
  const { mutate: deleteTemplate, isPending } = useDELETE(
    `templates/${item?.id}`
  );
  function deleteTableItem() {
    deleteTemplate(
      {},
      {
        onSuccess: () => {
          refetch();
          toast({
            title: "Feedback",
            description: "Your template has been Deleted.",
            variant: "default",
          });
        },
        onError: (error: any) => {
          const message = error?.response?.data?.detail;
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
        },
      }
    );
  }

  useEffect(() => {
    if (item) {
      setIsViewerLoading(true);
      setTimeout(() => setIsViewerLoading(false), 4000);
    }
  }, [item]);
  const docs = [
    {
      uri: templateUrl,
      fileType: getFileExtension(templateUrl),
    },
  ];
  useEffect(() => {
    const hideIframeToolbar = () => {
      // Ensure the container exists
      if (containerRef.current) {
        const iframe = containerRef.current.querySelector("iframe");
        if (iframe && iframe.contentWindow) {
          const doc = iframe.contentWindow.document;

          // Inject custom CSS to hide the toolbar
          const style = doc.createElement("style");
          style.innerHTML = `
            .toolbar-class { /* Replace this with the actual toolbar class name */
              display: none !important;
            }
          `;
          doc.head.appendChild(style);
        }
      }
    };

    // Wait a bit to ensure the iframe and its contents are loaded
    const timeoutId = setTimeout(hideIframeToolbar, 5000);

    // Cleanup in case the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className="w-full md:max-w-[25.875rem] py-5 px-[0.625rem] bg-[#F2F5F9] rounded-2xl hover:bg-[#E0E5EC] cursor-pointer">
          <div className="py-3 flex justify-between">
            <div className="flex flex-col gap-3 h-[400px]">
              <div className="flex justify-between w-full items-center gap-5">
                <div className="flex items-center gap-5">
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
                          <DialogContent
                            className={` ${
                              isMobile ? "w-full h-full" : "w-auto h-[95%]"
                            }  w-[650px] mx-auto my-auto overflow-y-scroll scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1.5 scrollbar-thumb-gray-500`}
                            showCloseButton={false}
                          >
                            {isMobile && (
                              <DialogClose className="fixed top-[2.5rem] right-[2rem] z-[100]">
                                <Cancel />
                              </DialogClose>
                            )}
                            <div
                              className={`${
                                isMobile ? "overflow-scroll" : ""
                              } w-full mx-auto`}
                            >
                              {isViewerLoading ? (
                                <Skeleton className="w-full h-[400px] rounded-lg" />
                              ) : (
                                <DocViewer
                                  documents={docs}
                                  pluginRenderers={DocViewerRenderers}
                                  config={{
                                    header: {
                                      disableHeader: true,
                                      disableFileName: true,
                                    },
                                  }}
                                  style={{ width: 650, height: 700 }}
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
                          <SheetContent
                            side={isMobile ? "bottom" : "top"}
                            className={` ${
                              isMobile
                                ? "inset-y-0 inset-x-auto"
                                : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"
                            } w-full mx-auto px-2 md:max-w-[35rem] focus-visible:outline-none overflow-y-hidden z-[9999]`}
                          >
                            <div
                              className={`h-full md:max-h-[31.5rem] border-none w-full flex flex-col gap-[2.5rem] rounded-2xl `}
                            >
                              <UploadTemplate
                                action="edit"
                                refetch={refetch}
                                template={item}
                              />
                            </div>
                          </SheetContent>
                        </Sheet>
                        <Sheet>
                          <SheetTrigger
                            className={`flex justify-center items-center gap-2 text-black ${
                              isMobile ? "p-2" : "p-3"
                            }`}
                          >
                            <DeleteSmallIcon />
                            <span>Delete</span>
                          </SheetTrigger>
                          <RenderDeleteSheet
                            text="Are you sure you want to delete this template?"
                            data={item}
                            deleteItem={deleteTableItem}
                          />
                        </Sheet>
                      </>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div ref={containerRef}>
                <DocViewer
                  documents={docs}
                  config={{
                    header: {
                      disableHeader: true,
                      disableFileName: true,
                      retainURLParams: false,
                    },
                  }}
                  theme={{
                    disableThemeScrollbar: true,
                  }}
                  style={{ width: 400, height: 400 }}
                />
              </div>
            </div>
          </div>
          <div
            className={`h-full max-h-[13.25rem] w-full md:max-w-[25.875rem] rounded-lg overflow-hidden`}
          >
            {isViewerLoading ? (
              <Skeleton className="w-full h-full rounded-lg" />
            ) : (
              // <Viewer initialPage={0} defaultScale={1} fileUrl={templateUrl} />
              <p></p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
