import View from "@/components/custom/Icons/View";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import DeleteSmallIcon from "@/components/custom/Icons/DeleteSmallIcon";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
import ResearcherRequestSummary from "../../../view-requests/researcher";

type ActionProps = {
  item: any;
  onDelete: (item: any) => void;
  redirectToSummary: () => void;
  isMobile?: boolean;
};

export default function SharedActions({
  item,
  onDelete,
  redirectToSummary,
  isMobile = false,
}: ActionProps) {
  return (
    <>
      <Sheet>
        <SheetTrigger
          className={`text-black flex justify-center items-center gap-2 ${
            isMobile ? "p-2" : "p-3"
          }`}
        >
          <View />
          {isMobile ? null : <span>View</span>}
        </SheetTrigger>
        <ResearcherRequestSummary request={item} />
      </Sheet>

      <div>
        <button
          onClick={redirectToSummary}
          className={`${
            item?.can_edit !== false ? "text-black" : "text-black/30"
          } items-center flex justify-center gap-2 ${isMobile ? "p-2" : "p-3"}`}
          disabled={item?.can_edit === false}
        >
          <PencilEdit size={14}/>
          {isMobile ? null : <span>Edit</span>}
        </button>
      </div>

      <Sheet>
        <SheetTrigger
          className={`flex justify-center items-center gap-2 
             ${item?.can_edit !== false ? "text-black" : "text-black/30"} 
            ${isMobile ? "p-2" : "p-3"}`}
          // disabled={item?.can_edit === false}
        >
          <DeleteSmallIcon />
          {isMobile ? null : <span>Delete</span>}
        </SheetTrigger>
        <RenderDeleteSheet
          text="Are you sure you want to delete this request?"
          data={item}
          deleteItem={onDelete}
        />
      </Sheet>
    </>
  );
}
