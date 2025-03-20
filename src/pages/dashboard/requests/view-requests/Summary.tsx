/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomFormField, {
  FormFieldType,
} from "@/components/custom/CustomFormField";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import { useRequestsStore } from "@/store/RequestFormStore";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import GreenCheckmark from "@/components/custom/Icons/GreenCheckmark";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import Download from "@/components/custom/Icons/Download";
import useUserStore from "@/store/user-store";
import GoogleDoc from "@/components/custom/Icons/GoogleDoc";
import { useGET } from "@/hooks/useGET.hook";
import { getApplicationData, getSupportDocs, renderReview } from "./helpers";

type SummaryPageProps = {
  fetchCount: number;
  isApproval?: boolean;
  handlePrint?: () => void;
  activeTab?: string;
  reviews?: any;
  request?: any;
};
const Summary = ({
  fetchCount,
  handlePrint,
  isApproval,
  activeTab,
  request,
}: SummaryPageProps) => {
  const { data } = useRequestsStore();
  const { checkbox, files } = data.requestsDetails;

  const form = useForm({
    defaultValues: {
      title: request?.research_title,
      objectives: request?.objectives_of_the_study,
      checkbox: {
        ...checkbox,
      },
      files: {
        ...files,
      },
    },
  });

  const { register } = form;
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const { activeRole } = useUserStore();

  const application = getApplicationData(request);
  const filteredDocs = getSupportDocs(request);

  function onSubmit() {
    try {
      if (handlePrint) {
        handlePrint();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const is_researcher = activeRole === "user";

  const endpoint = is_researcher
    ? `reviews/review-by-request-admin-type/${request?.id}`
    : `reviews/request/${request?.id}`;

  const queryKey = ["FETCH_REVIEW_BY_REQUEST_ID", request?.id, fetchCount];

  const { data: reviews_data } = useGET({
    url: endpoint,
    queryKey,
  });

  const reviews = reviews_data?.items || [];
  const admin_review = is_researcher ? reviews_data : null;

  return (
    <>
      <div className="w-full flex items-center justify-center mb-24">
        <div className="md:4/5 md:ml-20 md:my-10 mb-10 flex flex-col gap-6 max-w-4xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 text-sm text-[#454745]"
            >
              <section id="research-info" className="flex flex-col gap-4">
                <h1 className="text-[1.375rem] font-semibold pt-10 md:pb-5 md:py-5 text-black">
                  Research Information
                </h1>
                <FormInput
                  label="Title of research"
                  {...register("title", {
                    required: "This field is required",
                  })}
                  required
                  className="pointer-events-none !font-normal"
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="objectives"
                  control={form.control}
                  label="Objectives of the study"
                  labelClassName="!font-medium"
                  className="!pb-[12rem] flex pointer-events-none !border-gray-300"
                  required
                />
              </section>

              <section id="application-info" className="flex flex-col gap-4">
                <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5 text-black">
                  Application Information
                </h1>
                <div className="grid md:grid-cols-2 gap-8 ">
                  <>
                    {application.map((question) => (
                      <div key={question.label} className="flex flex-col gap-2">
                        <div className="text-sm text-[#454745]">
                          {question.label}&nbsp;
                          <span className="text-red-500">*</span>
                        </div>
                        <div
                          key={question.name}
                          className={`flex items-center gap-4 px-3 py-2 border border-[#040C21] ${
                            question.name === "question7"
                              ? "bg-inherit"
                              : "bg-[#192C8A14]"
                          } rounded-md w-full max-w-fit`}
                        >
                          {question.name === "question7" ? (
                            <Label className="text-base capitalize">
                              {question.value}
                            </Label>
                          ) : (
                            <>
                              <div className="flex justify-center items-center aspect-square h-[1.375rem] w-[1.375rem] rounded-full border border-[#868687] text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <div className="flex items-center justify-center rounded-full h-[0.875rem] w-[0.875rem] bg-black"></div>
                              </div>
                              <Label className="text-base capitalize">
                                {question.value}
                              </Label>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              </section>

              {/* Supporting Document Section */}
              <section id="supporting-document" className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center text-black">
                  <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5">
                    Supporting Document
                  </h1>
                  {/* {(activeRole === "reviewer" &&
                    activeTab === "review_request") ||
                    ((pathname.includes("/requests/review-requests") ||
                      pathname.includes("/requests/manage-requests")) && (
                      <p className="text-[#000066] flex gap-2 items-center font-semibold cursor-pointer">
                        {" "}
                        <span className="underline">
                          download all supporting documents
                        </span>{" "}
                        <Download />
                      </p>
                    ))} */}
                </div>
                <div className="md:grid md:grid-cols-2 gap-8 flex flex-col">
                  {filteredDocs.map((file, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1 md:gap-2 md:flex-row md:justify-between">
                          <div className="font-semibold text-sm">
                            {file.label}
                            <span className="text-red-500">&ensp;*</span>
                          </div>
                          <div className="text-[#868687] text-xs">
                            .Doc, .Docx, .Pdf (Max of 3MB)
                          </div>
                        </div>
                        <div
                          key={file.id}
                          className="w-full flex justify-between items-center border border-gray-300 px-2 py-1 rounded-md mb-2"
                        >
                          <span className="flex gap-2 items-center justify-center">
                            {activeTab === "review_request" ||
                            !(activeRole == "user") ? (
                              <span className="text-black text-[0.8rem]">
                                <GoogleDoc />
                              </span>
                            ) : (
                              <span>
                                <GreenCheckmark />
                              </span>
                            )}
                            <span>{file.name}</span>
                          </span>
                          <a href={file?.href} className="p-2">
                            <span>
                              <Download />
                            </span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Comments and Reviews Section */}

              <section
                id="comments-reviews"
                className="py-5 px-3 flex flex-col gap-4"
              >
                <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center text-black">
                  <h1 className="text-[1.375rem] font-semibold pt-10 pb-5 md:py-5">
                    Comments and Reviews
                  </h1>
                </div>
                {is_researcher ? (
                  admin_review ? (
                    renderReview(admin_review)
                  ) : (
                    <p>No Review yet.</p>
                  )
                ) : reviews.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {reviews.map(renderReview)}
                  </div>
                ) : (
                  <p>No Reviews Available</p>
                )}
              </section>

              {/* Print Button for Researcher */}
              {isMobile && activeTab === "request table" && (
                <div className="w-full my-4 flex items-center justify-center">
                  <Button
                    className={`${
                      isApproval
                        ? "text-white rounded-2 py-3 !bg-primary "
                        : "text-[#6A6C6A] rounded-[2.75rem] py-[1.375rem]"
                    } !max-w-[9.375rem] w-full font-semibold px-6 border border-[#0C0C0F29] bg-inherit hover:bg-inherit hover:border-[#0C0C0F29]`}
                    // biome-ignore lint/complexity/noUselessTernary: <explanation>
                    disabled={isApproval ? false : true}
                  >
                    Print
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Summary;
