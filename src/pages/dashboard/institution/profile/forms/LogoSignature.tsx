import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import ins_logo from "@/assets/ins_logo.svg";
import ins_Signature from "@/assets/ins_signature.svg";
import { useRequestsStore } from "@/store/RequestFormStore";
import Loader from "@/components/custom/Loader";
import Camera from "@/components/custom/Icons/Camera";

export const LogoSignature = ({ onSave }: { onSave: () => void }) => {
  const formSchema = z.object({
    institution: z.string().min(1, { message: "Please fill this field" }),
  });

  const institutions = [
    "University of Abuja",
    "University of PortHarcourt",
    "University of Lagos",
    "University of Benin",
  ];
  const { data, setData } = useRequestsStore();
  const defaultValues = {
    institution: data.requestsDetails.institution,
  };
  const [institute, setInstitute] = useState("");
  const [loading, setLoader] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    setValue,
    formState: { isValid },
    reset,
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoader(true);
    try {
      setData({
        requestsDetails: {
          ...data.requestsDetails,
          institution: values.institution,
        },
      });
      setTimeout(() => {
        setLoader(false);
        onSave();
        reset();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {loading && <Loader />}
      <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col text-xs mt-2">
              <div>
                <span className="font-inter font-semibold text-md">
                  Institution Logo
                </span>
                <div className="flex items-center">
                  <div className="bg-slate-300 rounded-full flex justify-center w-fit aspect-square object-cover">
                    <img src={ins_logo} alt="Institution Logo" />
                    <div className="relative flex items-end">
                      <span className="bg-white rounded-full w-9 h-9 flex justify-center items-center absolute -ml-10 cursor-pointer">
                        <Camera />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span>Drop your photo here or select a file</span>
                    <span>Supports JPG,PNG.</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-inter font-semibold text-md">
                  Institution Signature
                </span>
                <div className="flex items-center">
                  <div className="bg-slate-300 rounded-full flex w-fit aspect-square object-cover">
                    <img src={ins_Signature} alt="Institution Logo" />
                    <div className="relative flex items-end">
                      <span className="bg-white rounded-full w-9 h-9 flex justify-center items-center absolute -ml-10 cursor-pointer">
                        <Camera />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span>Drop your photo here or select a file</span>
                    <span>Supports JPG,PNG.</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant={isValid ? "default" : "ghost"}
              className={`my-4 focus:outline-none py-4`}
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
