import { FC, InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, 
        FormField, 
        FormItem, 
        FormLabel, 
        FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const FormInput: FC<InputProps> = ({ name, label, className, disabled, readOnly, ...rest }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  const { type, required } = rest;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { value, onChange } = field;
        return (
          <FormItem className="flex flex-col gap-0">
            <FormLabel className="flex gap-0 mt-2 font-md">
              {label}
              {required && (
                <span className="text-error text-red-500" title="required">
                  &ensp;*
                </span>
              )}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                
                  type={
                    type === "password"
                      ? isPasswordVisible
                        ? "text"
                        : "password"
                      : type
                  }
                  placeholder={rest.placeholder}
                  onChange={onChange}
                  value={value}
                  className={`font-medium rounded-[4px] ${
                    error ? "border-red-500" : "border-gray-300"
                  }  placeholder:text-black/30 ${className}`}
                  disabled={disabled}
                  readOnly={readOnly}
                  autoComplete="on"
                />
                {rest.type === "password" && (
                  <div
                    className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-4"
                    onClick={() => setPasswordVisibility(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                        <img src="icons/eye-off.svg" alt="eye on icon"/>
                    ) : (
                        <img src="icons/eye.svg" alt="eye on icon"/>
                    )}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;