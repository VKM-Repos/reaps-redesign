import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import { useSpecializationsStore } from "@/store/specializationsFormStore";
import { SpecializationItems } from "@/types/specialization";

type Props = {
  handleNext: () => void;
  data: SpecializationItems;
};

const formSchema = z.object({
  title: z.string().min(1, { message: "Please fill this field" }),
});

export default function EditSpecialization({
  handleNext,
  data: specializationDetails,
}: Props) {
  const { data, setData } = useSpecializationsStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: specializationDetails?.title ?? "",
    },
  });

  const {
    register,
    formState: { isValid },
  } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setData({
      specializationsDetails: {
        ...data.specializationsDetails,
        title: values.title,
      },
    });
    handleNext();
  };

  return (
    <>
      <SheetHeader className="mt-20 px-1 md:mt-16">
        <SheetTitle className="inter text-left text-[1.625rem] font-bold md:text-center">
          Edit specialization
        </SheetTitle>
        <SheetDescription className="inter text-left text-sm text-[#454745] md:text-center">
          You can change the name of your specialization below. Make sure to
          click the “Next” button to save your changes
        </SheetDescription>
      </SheetHeader>
      <div className="mx-auto my-0 w-full px-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="!focus:border-none flex flex-col gap-[3.75rem]"
          >
            <FormInput
              {...register("title")}
              placeholder="Specialization Title"
            />
            <Button
              type="submit"
              variant={isValid ? "default" : "ghost"}
              disabled={!isValid}
              className="focus:outline-none"
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
