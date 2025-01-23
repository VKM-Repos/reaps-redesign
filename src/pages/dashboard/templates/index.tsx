import Loader from "@/components/custom/Loader";
import { useMediaQuery } from "react-responsive";
import EmptyState from "./components/emptystate";
import UploadedTemplates from "./components/uploaded-templates";
import { useGET } from "@/hooks/useGET.hook";
import UploadTemplateSheet from "./components/upload-templates/upload-template-sheet";

export default function Templates() {
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
          {templates?.items?.length !== 0 && (
            <UploadTemplateSheet refetch={refetch} />
          )}
        </div>
        <div className="mb-24">
          {templates?.items?.length !== 0 ? (
            <UploadedTemplates templates={templates} refetch={refetch} />
          ) : (
            <EmptyState>
              <UploadTemplateSheet refetch={refetch} />
            </EmptyState>
          )}
        </div>
      </div>
    </>
  );
}
