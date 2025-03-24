import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";
import InstitutionDetailsForm from "../../components/forms/institution-details-form";
import { ActivateInstitution } from "../../components/activate-institution";
import { useGET } from "@/hooks/useGET.hook";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Unhappy from "@/assets/unhappy.svg";
import Loader from "@/components/custom/Loader";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { usePATCH } from "@/hooks/usePATCH.hook";

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
});

const InstitutionInformationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Fetch institution details
  const { data } = useGET({
    url: `institutions/${id}`,
    queryKey: ["GET-INSTITUTION-DETAILS", id],
    enabled: !!id,
  });

  // Fetch payment config
  const {
    data: payment_config,
    isError,
    isPending,
  } = useGET({
    url: `payment-configs/${id}`,
    queryKey: ["GET-PAYMENT-CONFIG", id],
    enabled: !!id,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact_number: "",
      state: "",
      country: "",
      address: "",
      context: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.institution_name || "",
        email: data.email || "",
        contact_number: data.contact_number || "",
        state: data.state_name || "",
        country: data.country || "",
        address: data.address || "",
        context: data.institution_context || "",
      });
    }
  }, [data, form.reset]); // Reset form when data changes

  // Show alert if payment config is missing
  useEffect(() => {
    if (!payment_config && isError) {
      setOpen(true);
    }
  }, [payment_config, isError]);

  const { mutate: updateInstitution } = usePATCH(`institutions/${id}`);

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    const requestBody = {
      institution_name: formData.name,
      country: formData.country,
      longitude: 0,
      latitude: 0,
      contact_number: formData.contact_number,
      email: formData.email,
      address: formData.address,
      state_name: formData.state,
      institution_context: formData.context,
    };

    updateInstitution(requestBody, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Institution details updated successfully.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.response?.data?.detail || "An error occurred.",
        });
      },
    });
  };

  return (
    <>
      {isPending && <Loader />}
      <InstitutionLayout>
        <TransitionElement>
          <div className="flex flex-col gap-y-[4rem] p-8">
            <Header title="Information" actions={<ActivateInstitution />} />
            <div className="w-[90%] mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <InstitutionDetailsForm form={form} />
                  <div className="flex justify-end items-center gap-5 mt-14">
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </TransitionElement>

        {/* Dialog for missing payment config */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[35%] overflow-y-scroll h-full max-h-[40vh] my-auto p-12 no-scrollbar bg-white">
            <div className="w-full flex flex-col gap-y-4 items-center justify-center">
              <span>
                <img
                  src={Unhappy}
                  className="w-[80px] p-4 bg-[#BF1E2C]/10 border-[#BF1E2C] aspect-square border rounded-full"
                  alt="remark"
                />
              </span>
              <DialogTitle className="text-center text-xl2 font-semibold font-inter">
                Incomplete!
              </DialogTitle>
              <DialogDescription className="text-sm text-center">
                You need to set up the payment profile for this institution
                before activation can be successful.
              </DialogDescription>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("configs")}
                >
                  Go to Configuration page
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </InstitutionLayout>
    </>
  );
};

export default InstitutionInformationPage;
