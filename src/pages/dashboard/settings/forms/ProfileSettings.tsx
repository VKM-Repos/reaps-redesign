import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, CountryListItemType } from "country-list-json";
import countryFlags from "@/lib/data/countries.json";
import { Label } from "@/components/ui/label";
import Loader from "@/components/custom/Loader";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { formatISODate } from "@/lib/utils";
import useUserStore from "@/store/user-store";
import { toast } from "@/components/ui/use-toast";
import CalendarIcon from "/icons/calendar-03.svg";

type FlagData = {
  url: string;
  alpha3: string;
  name: string;
  file_url: string;
  license: string;
};

export const ProfileSettings = ({ onSave }: { onSave: () => void }) => {
  const [dialCode, setDialCode] = useState("+93");
  const [selectedFlag, setSelectedFlag] = useState();
  const { user, updateUser } = useUserStore();
  const dateRef = useRef<HTMLInputElement | null>(null);
  const formSchema = z.object({
    first_name: z.string().min(1, { message: "Please fill this field" }),
    last_name: z.string().min(1, { message: "Please fill this field" }),
    phone_number: z
      .string()
      .min(1, { message: "Please fill this field" })
      .regex(/^\d+$/, {
        message: "Phone number should contain only numbers",
      }),
    country_code: z.string().min(1, { message: "Please enter a country code" }),
    date_of_birth: z.any(),
  });

  const defaultValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    country_code: user?.country_code || "+234",
    date_of_birth: user?.date_of_birth || "2024-10-27T23:00:00.000Z",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    register,
    formState: { isValid },
    setValue,
    watch,
  } = form;
  const [flags] = useState<FlagData[]>(countryFlags);
  const [countriesData] = useState<CountryListItemType[]>(countries);
  // performance issues on this component
  const flagsMap = useMemo(() => {
    return new Map(flags.map((flag) => [flag.name, flag.file_url]));
  }, [flags]);

  const combinedData = useMemo(() => {
    return countriesData
      .map((country) => ({
        ...country,
        flag: flagsMap.get(country.name) || "",
      }))
      .filter((country) => flagsMap.has(country.name));
  }, [countriesData, flagsMap]);

  const countryCode = watch("country_code", defaultValues.country_code);

  useMemo(() => {
    if (defaultValues.country_code) {
      const initialCountry: any = combinedData.find(
        (country) => country.dial_code === defaultValues.country_code
      );
      if (initialCountry) {
        setDialCode(initialCountry.dial_code);
        setSelectedFlag(initialCountry.flag);
      }
    }
  }, [defaultValues.country_code, combinedData]);

  // const combinedData = countriesData
  //   .filter((country) => flags.some((f) => f.name === country.name))
  //   .map((country) => {
  //     const flag = flags.find((f) => f.name === country.name);
  //     return {
  //       ...country,
  //       flag: flag?.file_url || "",
  //     };
  //   });
  const { mutate, isPending } = usePATCH("users/me", { method: "PUT" });
  function onSubmit(values: z.infer<typeof formSchema>) {
    values.date_of_birth = formatISODate(values.date_of_birth);
    mutate(values, {
      onSuccess: (response) => {
        updateUser(response);
        onSave();
        toast({
          title: "Feedback",
          description: "You have updated your profile",
          variant: "default",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Error updating your profile",
          variant: "destructive",
        });
      },
    });
  }
  const handleClickDate = () => {
    console.log(dateRef);
    dateRef.current?.showPicker();
  };
  return (
    <>
      {isPending && <Loader />}
      <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-6">
              <FormInput
                label="Your First Name"
                type="text"
                placeholder="John"
                {...register("first_name", {
                  required: "This field is required",
                })}
              />
              <FormInput
                label="Your Last Name"
                type="text"
                placeholder="Doe"
                {...register("last_name", {
                  required: "This field is required",
                })}
              />
              {/* <CustomFormField
                name="date_of_birth"
                fieldType={FormFieldType.DATE}
                control={form.control}
                label="Date of Birth"
              /> */}
              <FormInput
                label="Date of Birth"
                type="date"
                {...register("date_of_birth", {
                  required: "This field is required",
                })}
                className="invisible "
                ref={dateRef}
              />
              <Button
                variant="outline"
                type="button"
                onClick={handleClickDate}
                className="-mt-16 z-10"
              >
                {form.getValues().date_of_birth}{" "}
                <img
                  src={CalendarIcon}
                  className="ml-auto h-4 w-4 opacity-50 text-black"
                />
              </Button>
              <div className="flex gap-2">
                <div className="flex flex-col text-xs mt-2">
                  <Select
                    value={countryCode}
                    onValueChange={(value) => {
                      const selectedCountry: any = combinedData.find(
                        (country) => country.name === value
                      );
                      if (selectedCountry) {
                        setDialCode(selectedCountry.dial_code);
                        setSelectedFlag(selectedCountry.flag);
                        setValue("country_code", selectedCountry.dial_code, {
                          shouldValidate: true,
                        });
                      }
                    }}
                  >
                    <Label className="font-md">Country Code</Label>
                    <SelectTrigger className="min-w-[7.5rem] mt-2 !gap-2 w-full">
                      <SelectValue placeholder="Select a country">
                        {selectedFlag ? (
                          <div className="flex items-center gap-2 w-full">
                            <img
                              src={selectedFlag}
                              height="20px"
                              width="20px"
                              alt="Selected country flag"
                            />
                            <span>{dialCode}</span>
                          </div>
                        ) : (
                          <span className="text-xs">Select a country</span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Country Codes</SelectLabel>
                        {combinedData &&
                          combinedData.map((country) => (
                            <SelectItem key={country.name} value={country.name}>
                              <div className="flex gap-4 items-center justify-center">
                                <span>
                                  <img
                                    src={country.flag}
                                    height="24px"
                                    width="24px"
                                    alt={`${country.name} flag`}
                                  />
                                </span>
                                <span>{country.name}</span>
                                <span>{country.dial_code}</span>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <FormInput
                    label="Phone number"
                    type="number"
                    {...register("phone_number", {
                      required: "This field is required",
                    })}
                    className="no-spinner"
                  />
                </div>
              </div>
            </div>
            <Button
              variant={isValid ? "default" : "ghost"}
              className={`my-4 focus:outline-none py-4`}
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
