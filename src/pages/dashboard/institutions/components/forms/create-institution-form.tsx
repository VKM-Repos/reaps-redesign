import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Loader from "@/components/custom/Loader";
import { usePOST } from "@/hooks/usePOST.hook";
import { toast } from "@/components/ui/use-toast";
import InstitutionDetailsForm from "./institution-details-form";
import AdminDetailsForm from "./admin-details-form";
import SMILE from "@/assets/smile.svg";
import { ExternalLink } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Please fill this field." }),
  context: z.string().min(1, { message: "Please fill this field." }),
  email: z.string().email().min(1, { message: "Please fill this field." }),
  contact_number: z
    .string()
    .min(1, { message: "Please fill this field" })
    .regex(/\d+/, { message: "Only numbers allowed" }),
  country: z.string().min(1, { message: "Please fill this field" }),
  state: z.string().min(1, { message: "Please fill this field." }),
  address: z.string().min(1, { message: "Please fill this field." }),

  first_name: z.string().min(1, { message: "Please fill this field." }),
  last_name: z.string().min(1, { message: "Please fill this field." }),
  admin_email: z
    .string()
    .email()
    .min(1, { message: "Please fill this field." }),
  gender: z.enum(["male", "female"], { message: "Please select your gender" }),
  admin_phone_number: z
    .string()
    .min(1, { message: "Please fill this field" })
    .regex(/\d+/, { message: "Only numbers allowed" }),
  education_level: z.enum(["high_school", "bachelors", "masters", "phd"], {
    message: "Select education level",
  }),
  date_of_birth: z.string().min(1, { message: "Select your date of birth" }),
  orcid: z.string().min(1, { message: "Please fill this field." }),
});

// Step reducer function
type StepState = { step: number };
type StepAction = { type: "NEXT_STEP" } | { type: "RESET" };

const stepReducer = (state: StepState, action: StepAction): StepState => {
  switch (action.type) {
    case "NEXT_STEP":
      return { step: state.step + 1 };
    case "RESET":
      return { step: 1 };
    default:
      return state;
  }
};

export default function CreateInstitutionForm() {
  const [state, dispatch] = useReducer(stepReducer, { step: 1 });
  const [institution, setInstitution] = useState<any>({});

  const { mutate, isPending } = usePOST("onboarding", {});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const requestBody = {
      institution_data: {
        institution_name: data.name,
        country: data.country,
        longitude: 0,
        latitude: 0,
        contact_number: data.contact_number,
        email: data.email,
        address: data.address,
        state_name: data.state,
        institution_context: data.context,
        // status: "Active",
      },
      user_data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.admin_email,
        phone_number: data.admin_phone_number,
        orcid_number: data.orcid,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
        education_level: data.education_level,
      },
    };

    mutate(requestBody, {
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: "Institution created successfully.",
        });
        console.log(data);
        setInstitution(data);
        dispatch({ type: "NEXT_STEP" });
      },
      onError: (error) =>
        toast({
          title: "Error",
          description: error.response?.data?.detail || "An error occurred.",
        }),
    });
  }

  return (
    <>
      {isPending && <Loader />}

      {/* Step 1: Show Forms */}
      {state.step === 1 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InstitutionDetailsForm form={form} />
            <AdminDetailsForm form={form} />
            <div className="flex justify-end items-center gap-5 mt-14">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      )}

      {/* Step 2: Success Message & Payment Redirect */}
      {state.step === 2 && (
        <div className="text-center gap-4 flex flex-col items-center justify-center max-w-sm mx-auto mt-10">
          <span>
            <img
              src={SMILE}
              className="w-[80px] p-4 aspect-square border bg-success/10 border-success rounded-full"
              alt="remark"
            />
          </span>
          <h2 className="text-2xl font-semibold text-success">
            🎉 Institution Successfully Onboarded!
          </h2>
          <p className="text-gray-500 mt-2">
            Please update the payment settings in the configuration page
          </p>
          <Button
            className="mt-6 space-x-2"
            variant="outline"
            onClick={() => {
              window.location.href = `/institutions/${institution?.institution.id}`;
            }}
          >
            <span>Visit Institution Portal</span>
            <ExternalLink className="text-inherit size-5" />
          </Button>
        </div>
      )}
    </>
  );
}
