import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/custom/FormInput';
import { Form } from '@/components/ui/form';
import { useSpecializationsStore } from '@/store/specializationsFormStore';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type Props = {
  handleNext: () => void;
};

const formSchema = z.object({
  title: z.string().min(1, { message: 'Please fill this field' }),
});

export default function Specialization({ handleNext }: Props) {
  const { data, setData } = useSpecializationsStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    formState: { isValid },
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setData({
        specializationsDetails: {
          ...data.specializationsDetails,
          title: values.title,
        },
      });
      handleNext();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SheetHeader className="mt-24 px-1 md:mt-16">
        <SheetTitle className="inter text-left text-[1.625rem] font-bold md:text-center">
          Create a specialization
        </SheetTitle>
        <SheetDescription className="inter text-left text-sm text-[#454745] md:text-center">
          Specify your specialization to Help us understand the field of your
          research, think of it as defining your unique area of expertise.
        </SheetDescription>
      </SheetHeader>
      <div className="mx-auto my-0 w-full px-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="!focus:border-none flex flex-col gap-[3.75rem]"
          >
            <FormInput
              {...register('title', {
                required: 'This field is required',
              })}
            />

            <Button
              variant={isValid ? 'default' : 'ghost'}
              className={`focus:outline-none`}
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
