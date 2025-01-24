import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Dropzone from "react-dropzone";
import UploadIcon from "./Icons/UploadIcon";
import { Textarea } from "../ui/textarea";
import ChevronDown from "./Icons/ChevronDown";
import ChevronUp from "./Icons/ChevronUp";
import { Checkbox } from "@radix-ui/react-checkbox";
import GreenCheckmark from "./Icons/GreenCheckmark";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import CalendarIcon from "/icons/calendar-03.svg";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";
import { X } from "lucide-react";

export enum FormFieldType {
  INPUT = "input",
  RADIO = "radio",
  UPLOAD = "upload",
  COUNTER = "counter",
  TEXTAREA = "textarea",
  SWITCH = "switch",
  DATE = "date",
  CHECKBOX = "checkbox",
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
  subClassName?: string;
  options?: { label: string; value: string | boolean }[];
  answers?: string;
  disabled?: boolean;
  error?: FieldError | string | undefined;
  labelClassName?: string;
  onChange?: (value: any) => void;
};

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [selectedValue, setSelectedValue] = useState(field.value);

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} {...field} />
        </FormControl>
      );
    case FormFieldType.RADIO:
      return (
        <FormControl>
          <RadioGroup
            value={String(selectedValue)} // Ensure the value is always a string
            onValueChange={(value: string) => {
              const booleanValue = value === "true";
              setSelectedValue(booleanValue);
              field.onChange(booleanValue);
              props.onChange?.(booleanValue);
            }}
          >
            {props.options?.map((option) => {
              const isChecked = selectedValue === option.value;

              return (
                <div
                  key={String(option.value)}
                  className={`${
                    props.className
                  } flex items-center gap-4 px-3 py-2 rounded-md
            ${
              isChecked
                ? `border bg-[#192C8A14]  ${
                    props.error ? "border-red-500" : "border-[#040C21] "
                  }`
                : "border border-transparent"
            }
            hover:border hover:border-[#040C21] hover:bg-[#192C8A14] hover:rounded-md`}
                >
                  <RadioGroupItem
                    checked={isChecked}
                    value={String(option.value)} // Ensure value is string
                    className={props.subClassName}
                    id={`${field.name}-${option.value}`}
                    disabled={props.disabled}
                  />
                  <Label
                    className={`text-base ${props.error && "text-red-500"}`}
                    htmlFor={`${field.name}-${option.value}`}
                  >
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>
      );

    case FormFieldType.UPLOAD:
      return (
        <FormControl>
          <Dropzone
            accept={{
              "application/pdf": [".pdf"],
              "application/msword": [".doc"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            }}
            multiple={false}
            maxSize={3000000}
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
         
              // Directly pass the file to the form field's onChange handler
              if (file) {
                field.onChange(file);
              }
            }}
            disabled={props.disabled}
          >
            {({ getInputProps, getRootProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} className={props.className} />
                <span
                  className={` ${
                    props.error ? "border-red-500" : "border-gray-300"
                  } border w-full flex items-center ${
                    !field.value ? "justify-center" : "justify-left"
                  } mx-auto p-2 rounded-lg bg-white border-[#0C0C0F29]`}
                >
                  <p
                    className={`${
                      props.error ? "text-red-500" : "text-[#868687]"
                    } text-sm  w-full`}
                  >
                    {field.value === null || field.value === undefined || field.value?.length === 0 ? (
                      <span className="flex items-center justify-center gap-2">
                        <UploadIcon /> <span>Click to Upload</span>
                      </span>
                    ) : (
                      <span className="flex justify-between items-center w-full">
                        <span className="flex gap-2 items-center justify-center">
                          <GreenCheckmark />
                          {/* reload causes field value name to disappear */}
                          <p className="truncate whitespace-nowrap text-ellipsis max-w-[16rem] md:max-w-[24rem]">
                            {field.value?.name}
                          </p>
                        </span>
                        <span>
                          <button
                            type="button"
                            className="p-1"
                            onClick={() => {
                              field.onChange(null);
                            }}
                          >
                            <span className="text-[1rem]">
                              <X />
                            </span>
                          </button>
                        </span>
                      </span>
                    )}
                  </p>
                </span>
              </div>
            )}
          </Dropzone>
        </FormControl>
      );
    case FormFieldType.COUNTER:
      return (
        <FormControl>
          <div
            className={`${
              props.error ? "border-red-500" : "border-input"
            } flex items-center justify-center gap-4 px-4 w-full max-w-[4.5rem] border rounded-md`}
          >
            {field.value}
            <Input
              className={`${props.className} border-none invisible text-center !py-0 !px-0`}
              type="number"
              step={1}
              defaultValue={0}
              value={field.value}
              placeholder={props.placeholder}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                if (newValue >= 0) {
                  field.onChange(newValue);
                }
              }}
            />

            <div className="flex flex-col gap-2">
              <button
                type="button"
                data-action="increment"
                onClick={() => {
                  const newValue = (field.value || 0) + 1;
                  field.onChange(newValue);
                }}
                className="flex justify-center items-center rotate-180"
              >
                <ChevronUp />
              </button>
              <button
                type="button"
                data-action="decrement"
                onClick={() => {
                  const newValue =
                    (field.value || 0) > 0 ? (field.value || 0) - 1 : 0;
                  field.onChange(newValue);
                }}
                className="flex justify-center items-center"
              >
                <ChevronDown />
              </button>
            </div>
          </div>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            className={`${props.className} ${
              props.error ? "border-red-500" : "border-input"
            }`}
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );
    case FormFieldType.SWITCH:
      return (
        <FormControl>
          <Switch
            className={props.className}
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );
    case FormFieldType.DATE:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left text-black font-normal rounded-xl button-hover",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}

                <img
                  src={CalendarIcon}
                  className="ml-auto h-4 w-4 opacity-50 text-black"
                />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            className={props.className}
            {...field}
          />
        </FormControl>
      );
  }
};

const CustomFormField = (props: CustomProps) => {
  const { name, error, control, label, fieldType, required, labelClassName } =
    props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-4">
          <div className="flex flex-col gap-1 items-start md:flex-row md:justify-between md:items-center">
            <div>
              <FormLabel
                className={`${labelClassName} ${
                  error ? "text-red-500" : "text-[#454745]"
                } font-normal`}
              >
                {label}
              </FormLabel>
              {required && (
                <span className="text-error text-red-500" title="required">
                  &ensp;*
                </span>
              )}
            </div>
            {fieldType === FormFieldType.UPLOAD && (
              <span
                className={`flex font-normal justify-end ${
                  error ? "text-red-500" : "text-[#868687]"
                } text-xs`}
              >
                .Doc, .Docx, .Pdf (Max of 3MB)
              </span>
            )}
          </div>
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
