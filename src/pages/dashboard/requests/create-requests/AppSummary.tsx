// set up summary of all steps so far
import CustomFormField, {
  FormFieldType,
} from "@/components/custom/CustomFormField";
import FormInput from "@/components/custom/FormInput";
import PencilEdit from "@/components/custom/Icons/PencilEdit";
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CheckboxGroup, fileGroup, useRequestsStore } from "@/store/RequestFormStore";
import { useStepper } from "@/context/StepperContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EthicalApprovalCard from "../components/ethical-request-approval";
import SavingLoader from "../components/SavingLoader";
import { Label } from "@/components/ui/label";
import GreenCheckmark from "@/components/custom/Icons/GreenCheckmark";
import { useNavigate } from "react-router-dom";
import { questions } from "@/lib/helpers";
import { getRequiredFilesBasedOnYes } from "./SupportDoc";
import { useMediaQuery } from "react-responsive";
import useUserStore from "@/store/user-store";

type Props = {
  handleNext?: Function;
};

const AppSummary = ({ handleNext }: Props) => {
  const { data, setStep } = useRequestsStore();
  const { title, objectives, checkbox, files } = data.requestsDetails;
  const [loading, setLoading] = useState(false);
  const [showEthicalApprovalCard, setShowEthicalApprovalCard] = useState(false);
  const navigate = useNavigate();
  const { activeRole } = useUserStore();
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});

  const form = useForm({
    defaultValues: {
      title: title,
      objectives: objectives,
      checkbox: {
        ...checkbox,
      },
      files: {
        ...files,
      },
    },
  });

  const { register } = form;
  const { setStepper } = useStepper();
  const requiredFiles = getRequiredFilesBasedOnYes(checkbox as CheckboxGroup)

  // combine checkbox values with question labels
  const combinedAppInfoData = [
    ...questions.map((question) => ({
      ...question,
      value: (checkbox as CheckboxGroup)[question.name as keyof CheckboxGroup],
    })),
    {
      name: "question7",
      label: "What is the duration of the research? (months)",
      value: (checkbox as CheckboxGroup).question7,
    },
  ];

  // combine file data with requirements labels
  // filter - check if file path exists, return new array
  const combinedDocData = requiredFiles.map((requirement) => {
    const file = (files as fileGroup)[requirement.id as keyof fileGroup];
    const nameAndProfile = ["requirement1", "requirement2", "requirement3"].includes(requirement.id)
    ? `John Doe ${requirement.name}`
    : requirement.name;
   
    return {
      id: requirement.id,
      label: requirement.label,
      name: nameAndProfile,
      filePath: file ? file.path : null, 
    };
  }).filter((requirement) => requirement.filePath !== null);
  

  const updateStep = () => {
    setStepper(3);
  };

  const handleGoBack = (step: number) => {
    setStep(step);
  };

  useEffect(() => {
    updateStep();
  }, [updateStep]);

  function onSubmit() {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        if (handleNext) {
          handleNext();
        }
        if (activeRole === 'admin') {
          navigate('/requests/my-requests')
        } else { 
          navigate('/requests')
        }
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }

  const proceedToPay = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowEthicalApprovalCard(true);
  };

  return (
    <>
      {loading && <Loader />}
      {showEthicalApprovalCard ? (
        <EthicalApprovalCard
          educationLevel="Undergraduate"
          amountToPay="25000"
          showApproval={() => {
            setShowEthicalApprovalCard(false);
          }}
        />
      ) : (
        <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative flex flex-col gap-6">
          <SavingLoader />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl2 font-semibold pt-5 pb-5 md:py-2">
              Your application summary
            </h1>
            <p className="text-sm text-[#868786]">
              Please ensure all data is inputted correctly before making
              payments
            </p>
          </div>
          <div className="md:4/5 w-full mx-auto my-0 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-[1.375rem] md:text-xl2 font-semibold md:py-5">
                Research Information
              </h1>
              <Button
                onClick={() => {
                  handleGoBack(3);
                }}
              >
                <span className="flex items-center justify-center gap-2 text-white">
                  <PencilEdit /> {isMobile ? null : <span>Edit</span>}
                </span>
              </Button>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 text-sm text-[#454745]"
              >
                <FormInput
                  label="Title of research"
                  {...register("title", {
                    required: "This field is required",
                  })}
                  required
                  className="pointer-events-none font-normal capitalize"
                />
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  name="objectives"
                  control={form.control}
                  label="Objectives of the study"
                  labelClassName="!font-medium"
                  className="!pb-[12rem] flex pointer-events-none"
                  required
                />
                <div className="flex justify-between items-center">
                  <h1 className="text-[1.375rem] text-xl2 font-semibold md:py-5">
                    Application Information
                  </h1>
                  <Button
                    onClick={() => {
                      handleGoBack(2);
                    }}
                  >
                    <span className="flex items-center justify-center gap-2 text-white">
                      <PencilEdit /> {isMobile ? null : <span>Edit</span>}
                    </span>
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-8 ">
                  <>
                    {combinedAppInfoData
                      .map((question) => (
                        <div className="flex flex-col gap-2">
                          <div className="text-sm text-[#454745]">{question.label}&nbsp;<span className="text-red-500">*</span></div>
                          <div
                            key={question.name}
                            className={`flex items-center gap-4 px-3 py-2 border border-[#040C21] ${question.name === "question7" ? "bg-inherit" : "bg-[#192C8A14]"} rounded-md w-full max-w-fit`}
                          >
                            {question.name === "question7" ? 
                              <Label className="text-base capitalize">
                                {question.value}
                              </Label>
                            :
                              <>
                                <div className="flex justify-center items-center aspect-square h-[1.375rem] w-[1.375rem] rounded-full border border-[#868687] text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                  <div className="flex items-center justify-center rounded-full h-[0.875rem] w-[0.875rem] bg-black"></div>
                                </div>
                                <Label className="text-base capitalize">
                                  {question.value}
                                </Label>
                              </>
                            }
                          </div>
                        </div>
                        
                      ))}
                  </>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-[1.375rem] md:text-xl2 font-semibold md:py-5">
                    Support Docs
                  </h1>
                  <Button
                    onClick={() => {
                      handleGoBack(4);
                    }}
                  >
                    <span className="flex items-center justify-center gap-2 text-white">
                      <PencilEdit />  {isMobile ? null : <span>Edit</span>}
                    </span>
                  </Button>
                </div>
                <div className="md:grid md:grid-cols-2 gap-8 flex flex-col">
                  {combinedDocData.map((file) => {
                    return (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1 md:gap-2 md:flex-row md:justify-between">
                          <div className="font-semibold text-sm">{file.label}<span className="text-red-500">&ensp;*</span></div>
                          <div className="text-[#868687] text-xs">.Doc, .Docx, .Pdf (Max of 3MB)</div>
                        </div>
                         <div
                          key={file.id}
                          className="w-full flex justify-between items-center border border-gray-300 p-2 rounded-md mb-2"
                        >
                          <span className="flex gap-2 items-center justify-center">
                            <span>
                              <GreenCheckmark />
                            </span>
                            <span>{file.name}</span>
                          </span>
                          <span className="p-2">
                            <span className="text-[1rem]">x</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-4">
                  <Button
                    type="submit"
                    variant="outline"
                    className={`rounded-[2.75rem] py-[1.375rem] px-6 focus:outline-none button-hover w-full md:max-w-[15.625rem]`}
                  >
                    Save & Continue later
                  </Button>
                  <Button
                    onClick={(event) => {
                      proceedToPay(event);
                    }}
                    className={`focus:outline-none w-full md:max-w-[15.625rem] py-3 px-6`}
                  >
                    Proceed to pay
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default AppSummary;
