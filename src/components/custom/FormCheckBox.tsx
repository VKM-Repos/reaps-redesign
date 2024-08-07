import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

interface CheckboxProps {
    name: string;
    label?: string;
    value: string;
    required?: boolean;
    onChange: (name: string, value: string) => void;
  }

//   formState: { errors } 
//   onChange: fieldOnChange
const FormCheckBox: FC<CheckboxProps> = ({ name, label, required, onChange }) => {
    const { control } = useFormContext();
    const handleCheckboxChange = (newValue: string) => {
        onChange(name, newValue);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const { value } = field;
                return (
                    <FormItem className="flex flex-col gap-0">
                        <FormLabel className="flex gap-0 mt-2 font-md">
                            {label}
                            {required && (
                                <span className="text-error " title="required">
                                *
                                </span>
                            )}
                        </FormLabel>
                        <FormControl>
                            <div className="relative flex gap-2">
                               <Checkbox 
                                    name={name}
                                    value={value}
                                    checked={field.value.includes("Yes")}
                                    onChange={() => handleCheckboxChange("Yes")}
                                    />
                                <Checkbox 
                                    name={name}
                                    value={value}
                                    checked={field.value.includes("No")}
                                    onChange={() => handleCheckboxChange("No")}
                                    />
                            </div>
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}


export default FormCheckBox;