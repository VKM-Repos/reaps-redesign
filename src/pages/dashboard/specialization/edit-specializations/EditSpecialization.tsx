import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/custom/FormInput';
import { Form } from '@/components/ui/form';

type Props = {
  data: string;
  handleNext: () => void;
  setData: (title: string) => void;
};

const formSchema = z.object({
  title: z.string().min(1, { message: 'Please fill this field' }),
});

export default function EditSpecialization({
  data,
  handleNext,
  setData,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data,
    },
  });

  const {
    register,
    formState: { isValid },
  } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setData(values.title); // Update the parent state with the new title
    handleNext(); // Move to the next step
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
              {...register('title')}
              placeholder="Specialization Title"
            />
            <Button
              type="submit"
              variant={isValid ? 'default' : 'ghost'}
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
