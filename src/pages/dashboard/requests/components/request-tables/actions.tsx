import MoreIcon from "@/components/custom/Icons/MoreIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import View from "@/components/custom/Icons/View";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import DeleteSmallIcon from "@/components/custom/Icons/DeleteSmallIcon";
import RenderDeleteSheet from "@/components/custom/DeleteSheet";
import ResearcherRequestSummary from "../../view-requests/researcher";
import { toast } from "@/components/ui/use-toast";
import { RequestItems } from "@/types/requests";
import TransactionDetails from "./transaction-details";

type ActionProps = {
  item: RequestItems;
  deleteRequest: (item: string) => void;
  editRequest: () => void;
  isMobile?: boolean;
};

type Props = {
  data: RequestItems;
};

const Actions = ({ data }: Props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();

  const editRequest = () => {
    const redirectPath = encodeURIComponent(data.id);
    navigate(`/requests/edit-request?id=${redirectPath}`);
  };

  const deleteRequest = () => {
    toast({
      title: "Delete Request",
      description: "This action cannot be performed now...",
      variant: "destructive",
    });
  };

  return isMobile ? (
    <ActionsMobile
      item={data}
      editRequest={editRequest}
      deleteRequest={deleteRequest}
    />
  ) : (
    <ActionsDefault
      item={data}
      editRequest={editRequest}
      deleteRequest={deleteRequest}
    />
  );
};

export default Actions;

function ActionsDefault({ item, deleteRequest, editRequest }: ActionProps) {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button>
            <MoreIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-full max-w-24 .dropdown-shadow">
          <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
            <SharedActions
              item={item}
              deleteRequest={deleteRequest}
              editRequest={editRequest}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
function ActionsMobile({ item, deleteRequest, editRequest }: ActionProps) {
  return (
    <>
      <div className="w-full flex gap-2 justify-center items-center">
        <SharedActions
          item={item}
          deleteRequest={deleteRequest}
          editRequest={editRequest}
          isMobile
        />
      </div>
    </>
  );
}

function SharedActions({
  item,
  deleteRequest,
  editRequest,
  isMobile = false,
}: ActionProps) {
  console.log(item);

  return (
    <div className="text-xs">
      <Sheet>
        <SheetTrigger
          className={`w-full text-black hover:bg-primary/10 rounded-lg flex justify-start items-center gap-2 ${
            isMobile ? "p-1" : "p-2"
          }`}
        >
          <View />
          {isMobile ? null : <span>View</span>}
        </SheetTrigger>
        <ResearcherRequestSummary request={item} />
      </Sheet>
      <div>
        <button
          onClick={editRequest}
          className={`${
            item?.can_edit ? "text-black" : "text-black/30 cursor-not-allowed"
          } w-full text-black hover:bg-primary/10 rounded-lg flex justify-start items-center gap-2 ${
            isMobile ? "p-1" : "p-2"
          }`}
          disabled={!item?.can_edit}
        >
          <PencilEdit />
          {isMobile ? null : <span>Edit</span>}
        </button>
      </div>
      {/* disable delete option */}
      <Sheet>
        <SheetTrigger
          className={`w-full text-black hover:bg-primary/10 rounded-lg flex justify-start items-center gap-2 
             ${
               item?.can_edit !== false
                 ? "text-black"
                 : "text-black/30 cursor-not-allowed"
             } 
            ${isMobile ? "p-1" : "p-2"}`}
          disabled={item?.can_edit === false}
        >
          <DeleteSmallIcon />
          {isMobile ? null : <span>Delete</span>}
        </SheetTrigger>
        <RenderDeleteSheet
          text="Are you sure you want to delete this request?"
          data={item}
          deleteItem={deleteRequest}
        />
      </Sheet>
      {item && item.status === "Not Submitted Yet" ? null : (
        <TransactionDetails id={item?.id} />
      )}
    </div>
  );
}
