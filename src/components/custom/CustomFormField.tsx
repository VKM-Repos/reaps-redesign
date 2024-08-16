import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import React, { useState } from "react";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Dropzone, { DropzoneInputProps } from 'react-dropzone'
import UploadIcon from "./Icons/UploadIcon";
import { Textarea } from "../ui/textarea";
import ChevronDown from "./Icons/ChevronDown";
import ChevronUp from "./Icons/ChevronUp";

export enum FormFieldType {
    INPUT = "input",
    RADIO = "radio",
    UPLOAD = "upload",
    COUNTER = "counter",
    TEXTAREA = "textarea"
}

type CustomProps = {
   name: string;
   control: Control<any>;
   label?: string;
   placeholder?: string;
   required?: boolean;
   children?: React.ReactNode;
   fieldType: FormFieldType;
   className?: string;
   options?: { label: string, value: string}[]
   
}

const RenderInput = ({ field, props }: { field: any, props: CustomProps}) => {

    const [file, UploadFile] = useState<string>();
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount((prev) => prev + 1);
    };

    const handleDecrement = () => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
    };

    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <FormControl>
                    <Input placeholder={props.placeholder}/>
                    {...field}
                </FormControl>
            );
        case FormFieldType.RADIO: 
            return (
                <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                        {props.options?.map((option) => (
                            <div key={option.value} className="flex items-center gap-4 px-1">
                                <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                                <Label className="text-base " htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        case FormFieldType.UPLOAD: 
            return(
                <FormControl className="border-gray-300 rounded-md">
                    {/* <div className="justify-between flex">
                        <Label className="font-bold">{props.label} </Label>
                        
                    </div> */}
                    <Dropzone
                        accept={{
                        "/*": [".pdf", ".doc", ".docx"],
                        }}
                        multiple={false}
                        maxSize={5000000}
                        onDrop={(acceptedFiles) => {
                        const file = acceptedFiles[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const base64String = reader.result as string;
                            UploadFile(base64String);
                            field.onChange(base64String);
                        };
                        reader.readAsDataURL(file);
                        }}
                    >
                        {({  getInputProps }) => (
              <div
                // {...getRootProps({
                // getRootProps,
                //   className: cn(
                //     "mt-6 w-full min-h-[14rem] cursor-pointer flex items-center p-4 rounded-lg text-center",
                //     backgroundImage ? "bg-cover bg-center" : "bg-background"
                //   ),
                //   style: backgroundImage
                //     ? { backgroundImage: url(${backgroundImage}) }
                //     : {},
                // })}
              >
                <input {...getInputProps() as DropzoneInputProps} />
           
                  <span className="w-full flex items-center justify-center gap-2 mx-auto p-4 rounded-lg bg-white border-[#0C0C0F29]">
                    <UploadIcon />
                    <p className="text-sm text-[#868687]">{!file ? 'Click to Upload' : 'Change file'}</p>
                  </span>
              
              </div>
            )}
            </Dropzone>

            </FormControl>
            );
        case FormFieldType.COUNTER:
            return (
                <FormControl>
                    <div className="flex gap-4 px-3 w-full max-w-[6.25rem] border rounded-md border-input" {...field}>
                        <Input
                        className="border-none text-center !py-0 !px-0"
                        type="number"
                        value={count}
                        placeholder={props.placeholder}
                        readOnly
                        />
                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                data-action="increment"
                                onClick={handleIncrement}
                                className="flex justify-center items-center rotate-180"
                            >
                                <ChevronUp />
                            </button>
                            <button
                                type="button"
                                data-action="decrement"
                                onClick={handleDecrement}
                                className="flex justify-center items-center"
                            >
                                <ChevronDown />
                            </button>
                        </div>
                    </div>
                </FormControl>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                   <Textarea
                        placeholder={props.placeholder}
                        className={props.className}
                        {...field}
                    />
                </FormControl>
            )
        
            
    }

}

const CustomFormField = (props: CustomProps) => {
    const { name, control, label, fieldType, required} = props;


  return (
    <FormField 
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="gap-4">
                <div className="flex justify-between items-center">
                    <div> 
                        <FormLabel className="text-[#454745] font-[400]">{label}</FormLabel>
                        {required && (
                        <span className="text-error text-red-500" title="required">
                        &ensp;*
                        </span>
                        )}
                    </div>
                    {fieldType === FormFieldType.UPLOAD && <span className="flex font-[400] justify-end text-[#868687] text-sm">Doc, Docx, Pdf (Max of 3MB)</span>}
                </div>
              
               
                <RenderInput field={field} props={props}/>
                <FormMessage/>
            </FormItem>
        )}
    />

  )
}

export default CustomFormField