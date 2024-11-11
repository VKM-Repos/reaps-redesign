import AddIcon from "@/components/custom/Icons/AddIcon";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import UploadTemplate from "./components/upload-templates";
import EmptyState from "./components/emptystate";
import UploadedTemplates from "./components/uploaded-templates";
import { mock_templates } from "@/lib/helpers";
import { useGET } from "@/hooks/useGET.hook";

export default function Templates() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isLarge = useMediaQuery({ query: "(max-width: 1100px)" });
  const {
    data: templates,
    isPending,
    refetch,
  } = useGET({
    url: "templates",
    queryKey: ["GET_TEMPLATES_"],
  });
  return (
    <>
      {isPending && <Loader />}
      <div className="flex flex-col gap-[2rem]">
        <div
          className={`flex  ${
            isLarge ? "flex-col gap-5" : "flex-row gap-auto items-center"
          } justify-between mx-auto w-full`}
        >
          <h1 className="text-[1.875rem] font-bold">Research Templates</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className={`flex gap-4 items-center justify-center py-3 px-6 ${
                  isLarge ? "max-w-fit" : "max-w-[16.75rem]"
                }`}
              >
                <span>
                  <AddIcon />
                </span>
                Upload
              </Button>
            </SheetTrigger>
            <SheetContent
              side={isMobile ? "bottom" : "top"}
              className={` ${
                isMobile
                  ? "inset-y-0 inset-x-auto"
                  : "inset-y-auto inset-x-[30%] rounded-3xl md:!pb-12 md:!pt-0"
              } mx-auto px-2 md:max-w-[35rem] focus-visible:outline-none overflow-y-hidden`}
            >
              <div
                className={`h-full md:max-h-[31.5rem] border-none w-full flex flex-col gap-[2.5rem] rounded-2xl `}
              >
                <UploadTemplate action="create" refetch={refetch} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="mb-24">
          {mock_templates.length !== 0 ? (
            <UploadedTemplates templates={templates} refetch={refetch} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </>
  );
}
