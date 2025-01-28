/* eslint-disable @typescript-eslint/no-explicit-any */
import MoreIcon from "@/components/custom/Icons/MoreIcon";
import View from "@/components/custom/Icons/View";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import InstitutionRequestSummary from "../../../view-requests/admin";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SignatureIcon from "@/components/custom/Icons/Signature";
import ReviewersList from "./reviewers-list";

export default function Action({ item }: { item: any }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <MoreIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-fit .dropdown-shadow">
        <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
          <>
            <Sheet>
              <SheetTrigger
                className={`text-black flex justify-center items-center gap-2 p-3`}
              >
                <View />
                <span>View</span>
              </SheetTrigger>
              <InstitutionRequestSummary request={item} />
            </Sheet>
            <Dialog>
              <DialogTrigger
                className={`text-black flex justify-center items-center gap-2 p-3`}
              >
                <SignatureIcon />
                <span>Reviewers</span>
              </DialogTrigger>
              <ReviewersList request_id={item?.id} />
            </Dialog>
          </>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
