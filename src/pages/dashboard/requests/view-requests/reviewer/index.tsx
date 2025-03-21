import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cancel from "@/components/custom/Icons/Cancel";
import Summary from "../Summary";
import { useRef, useState } from "react";
import Smile from "@/assets/smile.svg";
import Unhappy from "@/assets/unhappy.svg";
import WriteReview from "../../components/WriteReview";
import { Dialog, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import View from "@/components/custom/Icons/View";

export default function ReviewerRequestSummary({
  data,
  activeTab,
}: {
  data: any;
  activeTab?: string;
}) {
  const [activeSection, setActiveSection] = useState("");
  const [fetchReviewCount, setFetchReviewCount] = useState(0);

  const close_dialog_ref = useRef<HTMLButtonElement | null>(null);
  const review_remarks = [
    { id: "1", text: "Satisfactory", color: "#34A853", icon: Smile },
    { id: "2", text: "Unsatisfactory", color: "#D03238", icon: Unhappy },
  ];

  // const { data: request_details, isPending: fetching_request_details } = useGET(
  //   {
  //     url: `requests/${request?.id}`,
  //     queryKey: ["FETCH_REQUEST_DETAILS", request?.id],
  //   }
  // );

  // navigate to sections on summary page
  console.log(data, "**??");

  const handleNavClick =
    (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    };

  // navigation buttons
  const NavItem = ({
    sectionId,
    label,
  }: {
    sectionId: string;
    label: string;
  }) => (
    <a
      href={`#${sectionId}`}
      className={`w-full h-12 items-center rounded-md px-3 py-4 hover:bg-slate-200 text-[#6A6C6A] 
        hover:text-black ${
          activeSection === sectionId ? "bg-slate-200 text-black" : ""
        }`}
      onClick={handleNavClick(sectionId)}
    >
      {label}
    </a>
  );
  const closeDialog = () => {
    close_dialog_ref?.current?.click();
    setFetchReviewCount((fetchReviewCount) => fetchReviewCount + 1);
  };
  return (
    <Sheet>
      <SheetTrigger className="flex items-center text-sm gap-2">
        <View /> <span>View</span>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="overflow-y-scroll h-full md:!p-0 rounded-t-lg flex flex-col"
      >
        <section className="w-full flex md:relative">
          <div className="w-full hidden md:block mx-6 md:mx-auto border-b fixed z-[100] bg-white top-0 py-2">
            <div className="md:flex justify-between px-5 items-center md:w-[65%] md:float-end md:px-10">
              <h1 className="md:text-[1.7rem] text-[1.5rem] font-semibold">
                Application Summary
              </h1>
              <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit">
                <Cancel />
              </SheetClose>
            </div>
          </div>
          <main className="md:absolute w-full flex flex-col md:flex-row">
            <div className="md:hidden border w-[90%] mx-6">
              <div className=" flex justify-between px-5 items-center">
                <h1 className="text-[1.5rem] font-semibold">
                  Application Summary
                </h1>
                <SheetClose className="bg-inherit focus:outline-none border-none hover:border hover:bg-accent hover:rounded-full p-2.5 h-fit">
                  <Cancel />
                </SheetClose>
              </div>
            </div>
            <div className="my-[6.875rem]  px-10 w-full max-w-[20rem] hidden md:block z-50 fixed">
              <div className="text-[0.875rem] flex-col items-center flex gap-5 ">
                <NavItem
                  sectionId="research-info"
                  label="Research Information"
                />
                <NavItem
                  sectionId="application-info"
                  label="Application Information"
                />
                <NavItem
                  sectionId="supporting-document"
                  label="Supporting Document"
                />
                <NavItem
                  sectionId="comments-reviews"
                  label="Comments and Reviews"
                />
                <div className="mt-3 w-full">
                  <Dialog>
                    <DialogTrigger className="w-full">
                      <button
                        type="button"
                        className="bg-primary text-white rounded-full flex items-center justify-center  px-6 py-[1.375rem] max-w-[13rem] md:w-full w-full h-[3.5rem] md:relative md:right-auto md:bottom-auto fixed bottom-4 right-6"
                      >
                        Write your Review
                      </button>
                    </DialogTrigger>
                    <WriteReview
                      request_id={data.all?.request?.id}
                      closeDialog={closeDialog}
                      data={data?.all}
                      remarks={review_remarks}
                      buttonText="Submit review"
                    />
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="hidden"
                        ref={close_dialog_ref}
                      >
                        Close
                      </button>
                    </DialogClose>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="my-0 mx-auto md:mt-[3.875rem] md:absolute md:right-10 md:w-full max-w-[90%] md:max-w-[75%]">
              <Summary
                fetchCount={fetchReviewCount}
                reviews={data?.all}
                request={data?.all?.request}
                activeTab={activeTab}
              />
            </div>
          </main>
        </section>
        <div className="md:hidden mt-auto">
          <Sheet>
            <SheetTrigger className="w-full fixed bottom-4">
              <button
                type="button"
                className="bg-primary text-white rounded-full flex items-center justify-center max-w-[13rem] md:w-full px-6 py-[1.375rem] w-full h-[3.5rem] md:relative md:right-auto md:bottom-auto fixed bottom-4 right-6"
              >
                Write your Review
              </button>
            </SheetTrigger>
            <div className="w-full">
              <WriteReview
                request_id={data.all?.request?.id}
                closeDialog={closeDialog}
                data={data?.all}
                remarks={review_remarks}
                buttonText="Submit review"
              />
            </div>
          </Sheet>
        </div>
      </SheetContent>
    </Sheet>
  );
}
