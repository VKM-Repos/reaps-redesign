// import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { CheckboxGroup, useRequestsStore } from "@/context/RequestFormStore";
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/context/StepperContext";




const checkboxSchema = z.object({
    id: z.string().min(1, {message: "Please fill this field"}),
    question: z.string().min(1, {message: "Please fill this field"}),
    options: z.array(
        z.object({
          label: z.string().min(1, { message: "Please fill this field" }),
          value: z.boolean(),
        })
    ),
})

const formSchema = z.array(checkboxSchema)

const initialCheckboxes: CheckboxGroup[] = [
    {
      id: "q0",
      question: "Are you the principal Investigator or a Local Principal Investigator?",
      options: [
        { label: "Yes", value: false },
        { label: "No", value: false },
      ],
    }, {
      id: "q1",
      question: "How would you describe yourself?",
      options: [
        { label: "Student", value: false },
        { label: "Researcher", value: false },
      ],
  },
    {
      id: "q3",
      question: "Is there a Co-Principal Investigator?",
      options: [
        { label: "Yes", value: false },
        { label: "No", value: false },
      ],
    },{
      id: "q4",
      question: "Is the project sponsored?",
      options: [
        { label: "Yes", value: false },
        { label: "No", value: false },
      ],
    },
     {
        id: "q5",
        question: "Did You Complete Ethics Training?",
        options: [
          { label: "Yes", value: false },
          { label: "No", value: false },
        ],
    },
     {
        id: "q6",
        question: "Will materials or tissue specimens be shipped out of the country?",
        options: [
          { label: "Yes", value: false },
          { label: "No", value: false },
        ],
    }
]


type Props = {
    handleNext: Function
}


export default function AppInfo({ handleNext}: Props) {
    // const isMobile = useMediaQuery({query: 'min-width: 768px'});
    const [ checkboxArray, setCheckboxArray ] = useState<CheckboxGroup[]>(initialCheckboxes);
    const { data, setData } = useRequestsStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialCheckboxes
        
    });
    const { control } = form;
    const { setStep } = useStepper();

    const updateStep = () => {
      setStep(0);
    }

    useEffect(() => {
      updateStep();
    }, [updateStep])

    const handleCheckBoxChange = (id: string, selectedLabel: string, checked: string | boolean) => {
        setCheckboxArray((prev) =>
          prev.map((checkbox) => {
            if (checkbox.id === id) {
                
                console.log(checked)
              return {
                ...checkbox,
                options: checkbox.options.map((option) =>
                    // set option.value to checked
                  option.label === selectedLabel
                    ? { ...option, value: !option.value } 
                    : { ...option, value: false } 
                ),
              };
              
            }
            return checkbox;
          })
        );
      };

     
   
    

    
    function onSubmit() {
        try {
            setData({
                requestsDetails: {
                    ...data.requestsDetails,
                    checkbox: checkboxArray
                }
            })
            handleNext();
            console.log(checkboxArray);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full px-4 md:w-4/5 md:px-0 mx-auto my-0 antialiased relative">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Application Information</h1>
            </div>
            <div className="md:w-4/5 w-full max-w-[368px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-8 ">
                      {initialCheckboxes.map((group, groupIndex) => (
                          <div key={group.id} className="flex flex-col gap-2">
                              <FormLabel className="text-sm text-[#454745]" >{group.question}</FormLabel>
                              <div className="flex gap-1">
                                {group.options.map((option, optionIndex) => (
                                <FormField
                                    key={option.label}
                                    name={`${groupIndex}.options.${optionIndex}.value`}
                                    control={control}
                                    
                                   
                                    render={({ field }) => (
                                        <FormItem className="space-x-3 space-y-0">
                                            <FormControl className="flex justify-center align-center px-4">
                                                <FormLabel className="text-base">
                                                    <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {handleCheckBoxChange(group.id, option.label, checked); field.onChange(); console.log(option.value)}}
                                                    />
                                                    {option.label}
                                                </FormLabel>
                                            </FormControl>
                                        </FormItem>
                                    
                                    )}
                                />
                                ))}
                              </div>
                              
                          </div>
                          ))}
                        </div>
                      <Button className={`my-4 focus:outline-none`}>Continue</Button>
                    </form>
                </Form>
            </div>


        </div>
    )
  }