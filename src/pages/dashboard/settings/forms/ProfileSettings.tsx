import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
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
import CustomFormField, {
  FormFieldType,
} from "@/components/custom/CustomFormField";
import Loader from "@/components/custom/Loader";

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
  const [loading] = useState(false);
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
    date_of_birth: z.date(),
  });

  const { data } = useOnboardingFormStore();

  const defaultValues = {
    first_name: data.onboardingDetails.firstName || "",
    last_name: data.onboardingDetails.lastName || "",
    phone_number: data.onboardingDetails.phoneNumber || "",
    country_code: "+234",
    date_of_birth: data.onboardingDetails.dob || undefined,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    register,
    formState: { isValid },
    // reset,
  } = form;
  const [flags, setFlags] = useState<FlagData[]>([]);
  const [countriesData, setCountries] = useState<CountryListItemType[]>([]);

  useEffect(() => {
    setCountries(countries);
    setFlags(countryFlags);
  }, []);

  const combinedData = countriesData
    .filter((country) => flags.some((f) => f.name === country.name))
    .map((country) => {
      const flag = flags.find((f) => f.name === country.name);
      return {
        ...country,
        flag: flag?.file_url || "",
      };
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, ";;;;;;");
    onSave();
    // setLoader(true);
    // try {
    //     setData({
    //         onboardingDetails: {
    //             ...data.onboardingDetails,
    //             firstName: values.firstName,
    //             lastName: values.lastName,
    //             phoneNumber: dialNumber,
    //             dob: values.dob,
    //         }
    //     });
    //     setTimeout(() => {
    //         setLoader(false);
    //         onSave();
    //         reset();
    //     }, 3000);
    // } catch (error) {
    //   console.error(error);
    // }
  }
  return (
    <>
      {loading && <Loader />}
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
              <CustomFormField
                name="date_of_birth"
                fieldType={FormFieldType.DATE}
                control={form.control}
                label="Date of Birth"
              />
              <div className="flex gap-2">
                <div className="flex flex-col text-xs mt-2">
                  <Select
                    onValueChange={(value: string) => {
                      const selectedCountry: any = combinedData.find(
                        (country) => country.name === value
                      );
                      if (selectedCountry) {
                        setDialCode(selectedCountry.dial_code);
                        setSelectedFlag(selectedCountry.flag);
                      }
                    }}
                    {...register("country_code", {
                      required: "This field is required",
                    })}
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
