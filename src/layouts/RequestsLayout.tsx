import { useNavigate } from "react-router-dom";
import Cancel from "@/components/custom/Icons/Cancel";
import { useMediaQuery } from "react-responsive";
import { requestsArray } from "@/lib/helpers";
import { useEthicalRequestStore } from "@/store/ethicalRequestStore";
import Stepper from "@/components/custom/Stepper";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

export default function RequestsLayout({ children }: Props) {
  const navigate = useNavigate();
  const { step, setStep, resetStore } = useEthicalRequestStore();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const goBackRequests = () => {
    navigate("/requests");
    setTimeout(() => {
      resetStore();
    }, 2000);
  };

  return (
    <main className="overflow-y-scroll fixed top-0 left-0 bg-white h-full w-full z-40">
      <div className="w-full mx-auto my-0 relative py-[2rem] px-[1.25rem] max-h-[130px] lg:p-[3.625rem] lg:max-h-[130px] border-b border-[#0C0C0F29]">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center w-full sm:w-11/12 mx-auto my-0">
            <div className="flex items-center justify-center w-full max-w-fit">
              <img src="/icons/mark.svg" alt="Mark logo" />
              <img
                className="lg:block hidden"
                src="/icons/reap-icon.svg"
                alt="Reap logo for website"
              />
            </div>

            <div className="flex justify-center items-center w-full">
              {step >= 2 && (
                <div className="w-full flex flex-col items-center justify-center gap-y-4">
                  {isMobile && (
                    <p className="text-center w-full font-[600] text-sm">
                      {requestsArray[step - 1]}
                    </p>
                  )}
                  <Stepper
                    step={step - 1}
                    setStep={setStep}
                    array={requestsArray.slice(1, -1)}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end w-full max-w-fit gap-1">
              {/* Not sure profile dropdown is important here */}
              {/* <ProfileDropDown /> */}
              <Sheet>
                <SheetTrigger>
                  <Cancel />
                </SheetTrigger>
                <SheetContent
                  side={isMobile ? "bottom" : "top"}
                  className={` ${
                    isMobile
                      ? "inset-x-auto inset-y-0"
                      : "inset-x-[30%] inset-y-auto rounded-3xl md:!pt-0"
                  } mx-auto flex h-full w-full flex-col items-center justify-center px-2 md:max-h-[20.5rem] md:max-w-[30rem]`}
                >
                  <div className="flex flex-col items-center justify-center gap-[2.5rem] border-none md:rounded-3xl">
                    <div className="flex flex-col items-center gap-[9.75rem] md:gap-7">
                      <div className="flex flex-col items-center gap-7">
                        <AlertCircle className=" text-destructive" size={64} />

                        <SheetHeader className="flex flex-col items-center justify-center gap-3">
                          <SheetTitle className="text-xl2 font-bold">
                            Leaving this page?
                          </SheetTitle>

                          <SheetDescription className="text-sm text-[454745] md:text-center">
                            Are you sure you want leave this page? You will lose
                            any unsaved changes
                          </SheetDescription>
                        </SheetHeader>
                      </div>

                      <div className="flex w-full items-center justify-center gap-10">
                        <SheetClose className="w-full max-w-[12rem] p-0">
                          <Button
                            variant="destructive"
                            className="w-full rounded-[2.75rem] !px-6 !py-3"
                            onClick={goBackRequests}
                          >
                            Leave
                          </Button>
                        </SheetClose>
                        <SheetClose className="w-full max-w-[12rem] rounded-[2.75rem] border border-[#0C0C0F29] !px-6 !py-3 text-sm">
                          Cancel
                        </SheetClose>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-[2.625rem]">{children}</div>
    </main>
  );
}
