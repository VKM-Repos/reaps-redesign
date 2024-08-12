// import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import FormCheckBox from "@/components/custom/FormCheckBox";
// import { useMediaQuery } from "react-responsive";
import { CheckboxGroup, useRequestsStore } from "@/context/RequestFormStore";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";



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
const formSchema = z.array(checkboxSchema)

const initialCheckboxes: CheckboxGroup[] = [
    {
      id: "q1",
      question: "What is your name?",
      options: [
        { label: "Yes", value: false },
        { label: "No", value: false },
      ],
    }, {
      id: "q1",
      question: "What is your name?",
      options: [
        { label: "Yes", value: false },
        { label: "No", value: false },
      ],
    },
    {
      id: "q2",
      question: "What is your favorite color?",
      options: [
        { label: "Yes", value: false },
        { label: "No", value: false },
      ],
    },{
      id: "q2",
      question: "What is your favorite color?",
      options: [
        { label: "Yes", value: false },
        { label: "No", value: false },
      ],
    },
    {
        id: "q3",
        question: "What is your status?",
        options: [
          { label: "Student", value: false },
          { label: "Researcher", value: false },
        ],
    }, {
        id: "q3",
        question: "What is your status?",
        options: [
          { label: "Student", value: false },
          { label: "Researcher", value: false },
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

    const { register, reset, formState: { isValid }} = form;
    // const [checkbox, setCheckbox] = useState<string>("");
    // const [checkboxArray, setCheckboxArray] = useState<string[]>([]);

    const handleCheckBoxChange = (id: string, selectedLabel: string) => {
        setCheckboxArray((prev) =>
          prev.map((checkbox) => {
            if (checkbox.id === id) {
                // console.log(option.label);
                console.log(selectedLabel)
              return {
                ...checkbox,
                options: checkbox.options.map((option) =>
                    
                  option.label === selectedLabel
                    ? { ...option, value: option.value } // Toggle the selected option
                    : { ...option, value: false } // Uncheck all other options
                ),
              };
            }
            console.log(checkbox.options)
            return checkbox;
          })
        );
      };
    

    
    function onSubmit() {
    const handleCheckBoxChange = (id: string, selectedLabel: string, value: boolean) => {
        //incorporate field.value, if checkbox is clicked, set field.value to true, if value is true
        setCheckboxArray((prev) =>
          prev.map((checkbox) => {
            if (checkbox.id === id ) {
                // console.log(option.label);
                // console.log(checkbox)
                // value = option.value
              return {
                ...checkbox,
                options: checkbox.options.map((option) =>    
                  option.label === selectedLabel
                    ? { ...option, value: value } // Toggle the selected option
                    : { ...option, value: false } // Uncheck all other options
                ),
              };
            }
            console.log(checkbox.options);
            return checkbox;
          })
        
        );
      };

    // take in selected checkbox
    // 
    

    
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
        <div className="w-full px-4 md:w-3/5 md:px-0 mx-auto my-0 antialiased relative">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Application Information</h1>
            </div>
            <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        {/* <FormField
                            control={control}
                            name=
                            render={() => (
                                <FormItem> */}
                                    <div>
                                    {initialCheckboxes.map((group, groupIndex) => (
                                        <div key={group.id}>
                                            <h3>{group.question}</h3>
                                            {group.options.map((option, optionIndex) => (
                                            <FormField
                                                key={option.label}
                                                name={`${groupIndex}.options.${optionIndex}.value`}  // Matches the expected path
                                                control={control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <FormLabel>
                                                                <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={() => {handleCheckBoxChange(group.id, option.label, field.value); field.onChange(); console.log(option.value)}}
                                                                />
                                                                {option.label}
                                                            </FormLabel>
                                                        </FormControl>
                                                    </FormItem>
                                                
                                                )}
                                            />
                                            ))}
                                        </div>
                                        ))}
                                        {/* {initialCheckboxes.map((checkbox) => (
                                            <FormField
                                                key={checkbox.id}
                                                control={control}
                                                name={checkbox}
                                                render={({ field }) => {
                                                    // const { value, onChange } = field;
                                                    return (
                                                        <FormItem 
                                                            key={key.id}
                                                            >
                                                             <FormLabel>{key.label}</FormLabel>
                                                                <FormControl>
                                                                <Checkbox
                                                                    checked={key.value === true}
                                                                    onCheckedChange={field.onChange}
                                                                    >Yes</Checkbox>
                                                                </FormControl>
                                                                <FormControl>
                                                                <Checkbox
                                                                    checked={key.value === false}
                                                                    onCheckedChange={field.onChange}
                                                                >No</Checkbox>
                                                                </FormControl>
                                                            </FormItem>
                                                    )
                                                }}>

                                            </FormField>
                                        ))} */}
                                    </div>
                                {/* </FormItem>
                            )}
                            /> */}
                             <Button variant={isValid ? "default" : "ghost"} className={`my-4 focus:outline-none`}>Continue</Button>
                    </form>

                </Form>
            </div>


        </div>
    )
}