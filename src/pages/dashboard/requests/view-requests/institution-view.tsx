import Cancel from "@/components/custom/Icons/Cancel";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import Summary from "./Summary";

export default function InstitutionRequestSummary() {
  const isMobile = useMediaQuery({ query: "(max-width: 737px)" });
  return (
    <SheetContent side="bottom" className="h-full md:!p-0">
      <div className="mx-auto md:px-10 md:py-2 md:border-t-0 border border-b-[#0C0C0F29] w-full  flex justify-between md:justify-unset fixed top-0 z-[9999] bg-inherit">
        <div
          className={`${
            isMobile ? "border border-[#0C0C0F29] !w-[95%]" : ""
          } w-full  `}
        >
          <div className="mx-auto flex justify-between md:justify-unset w-[90%]">
            <div className="p-2 w-full">
              <h1 className="text-center font-semibold text-xl md:text-xl2">
                Application Summary
              </h1>
            </div>
          </div>
        </div>
        <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit">
          <Cancel />
        </SheetClose>
      </div>
      <div className="px-4">
        <Summary />
      </div>
    </SheetContent>
  );
}

{
  /* <div className={`${isMobile ? 'border border-[#0C0C0F29] !w-[95%]' : ''} w-full md:w-[90%] mx-auto flex justify-between md:justify-unset`}>
                <div className="p-2 w-full">
                    <h1 className="text-center font-semibold text-xl md:text-xl2">
                    Your application Summary
                    </h1>
                </div> */
}
