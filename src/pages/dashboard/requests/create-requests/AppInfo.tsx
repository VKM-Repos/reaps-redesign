// import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
// import FormCheckBox from "@/components/custom/FormCheckBox";
// import { useMediaQuery } from "react-responsive";
import { useRequestsStore } from "@/context/RequestFormStore";


const formSchema = z.object({
    checkbox: z
    .string()

})
type UnexpectedObject = {
    [key: string]: any;
  };

type Props = {
    handleNext: Function,

    checkBoxInfo?: UnexpectedObject
}

export function AppInfo({ handleNext}: Props) {
    // const isMobile = useMediaQuery({query: 'min-width: 768px'});

    const { data, setData } = useRequestsStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    // const { register, reset, formState: { isValid }} = form;
    // const [checkbox, setCheckbox] = useState<string>("");
    // const [checkboxArray, setCheckboxArray] = useState<string[]>([]);

    const checkboxArray = [""];

    function onSubmit() {
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    checkbox: checkboxArray
                }
            });
            handleNext();
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full px-4 md:w-3/5 md:px-0 mx-auto my-0 antialiased relative">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Application Information</h1>
            </div>
            <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        {/* <FormCheckBox 
                            {...register("")/> */}
                    </form>

                </Form>
            </div>


        </div>
    )
}