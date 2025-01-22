import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/Loader";
import { useGET } from "@/hooks/useGET.hook";
import { SpecializationItems } from "@/types/specialization";
import CreateSpecialization from "./create-specialization";

type Props = {
  handleNext: () => void;
};

const formSchema = z.object({
  specialisation: z.string().min(1, "Please select a specialization"),
});

export default function SelectSpecialization({ handleNext }: Props) {
  const { data: specializationData, isPending } = useGET({
    queryKey: ["specialization", "keywords"],
    url: "specializations",
    withAuth: true,
  });

  const specializations: SpecializationItems[] =
    specializationData?.items || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialisation: "",
    },
  });

  const {
    formState: { isValid },
    setValue,
    watch,
  } = form;

  const selectedSpecialization = watch("specialisation");

  function onSubmit() {
    try {
      handleNext();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isPending && <Loader />}
      {specializations.length > 0 ? (
        <>
          <div className="flex flex-col justify-center items-center pt-4">
            <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">
              Select your specialization
            </h1>
          </div>
          <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
              >
                <div className="flex flex-col text-xs mt-2">
                  <Select
                    onValueChange={(value: string) => {
                      setValue("specialisation", value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <Label className="font-sm">
                      Select your Specialisation
                    </Label>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue
                        placeholder={
                          selectedSpecialization || "Select specialization"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {specializations.map((spec) => (
                          <SelectItem key={spec.id} value={spec.id}>
                            {spec.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant={isValid ? "default" : "ghost"}
                  className="my-4 focus:outline-none"
                  type="submit"
                >
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        </>
      ) : (
        <CreateSpecialization handleSpecNext={handleNext} />
      )}
    </>
  );
}
