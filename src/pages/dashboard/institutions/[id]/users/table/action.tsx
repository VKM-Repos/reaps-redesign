/* eslint-disable @typescript-eslint/no-explicit-any */
import View from "@/components/custom/Icons/View";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet } from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import SignatureIcon from "@/components/custom/Icons/Signature";

export default function Action() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <div
          className={`text-black flex justify-center items-center gap-2 p-3`}
        >
          <span>View</span>
          <View />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl rounded-r-none p-1 w-fit .dropdown-shadow">
        <DropdownMenuGroup className="flex flex-col gap-3 justify-center items-start">
          <>
            <Sheet>
              <div
                className={`text-black flex justify-center items-center gap-2 p-3`}
              >
                <View />
                <span>View</span>
              </div>
            </Sheet>
            <Dialog>
              <div
                className={`text-black flex justify-center items-center gap-2 p-3`}
              >
                <SignatureIcon />
                <span>Reviewers</span>
              </div>
              {/* <ReviewersList request_id={item?.id} /> */}
            </Dialog>
          </>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
