import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import React, { useState } from "react";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Dropzone, { DropzoneInputProps } from 'react-dropzone'
import UploadIcon from "./Icons/UploadIcon";

export enum FormFieldType {
    INPUT = "input",
    RADIO = "radio",
    DOWNLOAD = "download",
    NUMBER = "number"
}

type CustomProps = {
   name: string;
   control: Control<any>;
   label?: string;
   placeholder?: string;
   required?: boolean;
   children?: React.ReactNode;
   fieldType: FormFieldType;
   options?: { label: string, value: string}[]
   
}

const RenderInput = ({ field, props }: { field: any, props: CustomProps}) => {

    const [file, UploadFile] = useState<string>()

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
        case FormFieldType.DOWNLOAD: 
            return(
                <FormControl>
                    <div className="justify-between flex">
                        <Label className="font-bold">{props.label} </Label>
                        <span className="flex font-[400] justify-end text-[#868687]">Doc, Docx, Pdf (Max of 3MB)</span>
                    </div>
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
           
                  <span className="w-fit flex items-center gap-2 mx-auto p-4 rounded-lg bg-white shadow-md">
                    <UploadIcon />
                    <p className="font-bold">{!file ? 'Click to Upload' : 'Change file'}</p>
                  </span>
              
              </div>
            )}
            </Dropzone>

            </FormControl>
            );
        case FormFieldType.NUMBER:
            return (
                <FormControl>
                    <Input type={FormFieldType.NUMBER} placeholder={props.placeholder}/>
                    {...field}
                </FormControl>
            )
        
            
    }

}

const CustomFormField = (props: CustomProps) => {
    const { name, control, label, required} = props;


  return (
    <FormField 
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="gap-4">
              <FormLabel className="text-[#454745] font-[400]">{label}</FormLabel>
                {required && (
                    <span className="text-error text-red-500" title="required">
                    &ensp;*
                    </span>
                )}
                <RenderInput field={field} props={props}/>
                <FormMessage/>
            </FormItem>
        )}
    />

  )
}

export default CustomFormField