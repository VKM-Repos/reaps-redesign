/* eslint-disable @typescript-eslint/no-explicit-any */
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useEthicalRequestStore } from "@/store/ethicalRequestStore";
import { questionsData } from "./questions";
import { Label } from "@/components/ui/label";
import GreenCheckmark from "@/components/custom/Icons/GreenCheckmark";
import PaymentCart from "./payment-cart";

type Props = {
  handleNext: () => void;
};

const ApplicationSummary = ({ handleNext }: Props) => {
  const { data, setStep } = useEthicalRequestStore();
  const { ethical_request_questions, ethical_request_files } = data;
  const [showPaymentCart, setShowPaymentCart] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleEditRequest = (step: number) => {
    setStep(step);
  };

  const proceedToPay = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowPaymentCart(true);
  };

  const ResearchInfoPreview = () => {
    return (
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-[1.375rem] md:text-xl2 font-semibold md:py-5">
            Research Information
          </h1>
          <Button
            onClick={() => {
              handleEditRequest(2);
            }}
          >
            <span className="flex items-center justify-center gap-2 text-white">
              <PencilEdit /> {isMobile ? null : <span>Edit</span>}
            </span>
          </Button>
        </div>

        <div className="space-y-4 mt-4">
          {questionsData.questions.map((question) => {
            if (
              question.type === "string" &&
              ethical_request_questions[question.name]
            ) {
              return (
                <div key={question.name}>
                  {question.name === "research_title" ? (
                    <div className="space-y-2">
                      <label className="flex gap-0 mt-2 text-sm">
                        {question.label}
                      </label>
                      <input
                        type="text"
                        className="border w-full px-3 py-2 bg-transparent pointer-events-none font-normal rounded-[4px] text-base"
                        value={
                          (ethical_request_questions[
                            question.name
                          ] as string) || ""
                        }
                        readOnly
                        disabled
                      />
                    </div>
                  ) : question.name === "objectives_of_the_study" ? (
                    <div className="space-y-2">
                      <label className="flex gap-0 mt-2 text-sm">
                        {question.label}
                      </label>
                      <textarea
                        className="border w-full px-3 py-2 bg-transparent pointer-events-none font-normal rounded-[4px] min-h-[15rem] text-base"
                        value={
                          (ethical_request_questions[
                            question.name
                          ] as string) || ""
                        }
                        readOnly
                        disabled
                      />
                    </div>
                  ) : null}
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>
    );
  };

  const ApplicationInfoPreview = () => {
    return (
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-[1.375rem] md:text-xl2 font-semibold md:py-5">
            Application Information
          </h1>
          <Button
            onClick={() => {
              handleEditRequest(3);
            }}
          >
            <span className="flex items-center justify-center gap-2 text-white">
              <PencilEdit /> {isMobile ? null : <span>Edit</span>}
            </span>
          </Button>
        </div>

        {/* Map out boolean and counter questions */}
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {questionsData.questions.map((question) => {
            const questionValue = ethical_request_questions[question.name];

            if (question.type === "boolean") {
              return (
                <div key={question.name} className="flex flex-col gap-2">
                  <span className="text-sm text-[#454745]">
                    {question.label}
                  </span>
                  <div className="flex items-center gap-4 px-3 py-2 border border-[#040C21] bg-[#192C8A14] rounded-md w-full max-w-fit">
                    <div className="flex justify-center items-center aspect-square h-[1.375rem] w-[1.375rem] rounded-full border border-[#868687] text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <div
                        className={`flex items-center justify-center rounded-full h-[0.875rem] w-[0.875rem] ${
                          questionValue ? "bg-black" : "bg-transparent"
                        }`}
                      ></div>
                    </div>
                    <Label className="text-base capitalize">
                      {questionValue ? "Yes" : "No"}
                    </Label>
                  </div>
                </div>
              );
            } else if (question.type === "counter") {
              return (
                <div key={question.name} className="flex flex-col gap-2">
                  <span className="text-sm text-[#454745]">
                    {question.label}
                  </span>
                  <span className="flex items-center gap-4 px-6 py-2 border border-[#040C21] bg-[#192C8A14] rounded-md w-full max-w-fit">
                    {questionValue}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>
    );
  };

  const SupportingDocsPreview = () => {
    const requiredDocs = questionsData.documents.required;

    const dynamicRequiredDocs = questionsData.questions
      .filter(
        (question) =>
          question.type === "boolean" &&
          ethical_request_questions[question.name] === true
      )
      .flatMap((question) => question.requiresFile ?? []);

    const allRequiredDocs = [
      ...requiredDocs.map((doc) => ({
        name: doc.name,
        label: doc.label,
        type: "required",
      })),
      ...dynamicRequiredDocs.map((fileName) => {
        const question = questionsData.questions.find((q) =>
          q.requiresFile?.includes(fileName)
        );
        const label = question
          ? question.documentLabel
          : fileName.replace("_", " ").toUpperCase();

        return {
          name: fileName,
          label,
          type: "required",
        };
      }),
      ...questionsData.documents.optional.map((doc) => ({
        name: doc.name,
        label: doc.label,
        type: "optional",
      })),
    ];
    return (
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-[1.375rem] md:text-xl2 font-semibold md:py-5">
            Supporting Documents
          </h1>
          <Button
            onClick={() => {
              handleEditRequest(4);
            }}
          >
            <span className="flex items-center justify-center gap-2 text-white">
              <PencilEdit /> {isMobile ? null : <span>Edit</span>}
            </span>
          </Button>
        </div>

        {/* Map out supporting documents */}
        <div className="md:grid md:grid-cols-2 gap-8 flex flex-col mt-4">
          {allRequiredDocs.map((doc) => {
            const file: any = ethical_request_files[doc.name];
            if (file) {
              const documentName = doc.label;
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 md:gap-2 md:flex-row md:justify-between">
                    <div className="font-semibold text-sm">{documentName}</div>
                    <div className="text-[#868687] text-xs">
                      .Doc, .Docx, .Pdf (Max of 3MB)
                    </div>
                  </div>
                  <div
                    key={doc.name}
                    className="w-full flex justify-between items-center border border-gray-300 p-3 rounded-md mb-2"
                  >
                    <span className="flex gap-2 items-center justify-center">
                      <span>
                        <GreenCheckmark />
                      </span>
                      <span className="truncate whitespace-nowrap text-ellipsis max-w-[16rem] md:max-w-[24rem]">
                        {file instanceof File ? file?.name : file?.name}
                      </span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>
    );
  };

  return (
    <>
      {showPaymentCart ? (
        <>
          <PaymentCart
            showApproval={() => {
              setShowPaymentCart(false);
            }}
          />
        </>
      ) : (
        <section className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl2 font-semibold pt-5 pb-5 md:py-2">
              Your application summary
            </h1>
            <p className="text-sm text-[#868786]">
              Please ensure all data is inputted correctly before making
              payments
            </p>
          </div>
          <div className="md:4/5 w-full mx-auto my-0 flex flex-col gap-12">
            <ResearchInfoPreview />
            <ApplicationInfoPreview />
            <SupportingDocsPreview />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-4">
            <Button
              variant="outline"
              onClick={handleNext}
              className="rounded-[2.75rem] py-[1.375rem] px-6 focus:outline-none button-hover w-full md:max-w-[15.625rem]"
            >
              Save & Continue later
            </Button>
            <Button
              onClick={(event) => {
                proceedToPay(event);
              }}
              className="focus:outline-none w-full md:max-w-[15.625rem] py-3 px-6"
            >
              Proceed to pay
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default ApplicationSummary;
