/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import BackButton from "@/components/custom/BackButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/custom/FormInput";
import type { Props } from "@/types/forms.types";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import { useMobileContext } from "@/context/MobileContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import Loader from "@/components/custom/Loader";
import { countries, type CountryListItemType } from "country-list-json";
import countryFlags from "@/lib/data/countries.json";
import axios from "axios";

enum EducationLevel {
  HIGH_SCHOOL = "high_school",
  BACHELORS = "bachelors",
  MASTERS = "masters",
  PHD = "phd",
}
enum Gender {
  MALE = "male",
  FEMALE = "female",
}
enum Description {
  Student = "Student",
  Researcher = "Researcher",
}

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "Please fill this field" }),
    lastName: z.string().min(1, { message: "Please fill this field" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(12, { message: "Phone number must be at most 12 digits" })
      .regex(/^\d+$/, {
        message:
          "Phone number must only contain digits (no spaces or special characters)",
      }),
    country_code: z.string().regex(/^\+\d{1,4}$/, {
      message: "Country code must start with '+' and be 1-4 digits long",
    }),
    education_level: z.nativeEnum(EducationLevel, {
      errorMap: () => ({ message: "Please select a valid education level" }),
    }),
    dob: z.string().min(1, { message: "Please select your date of birth" }),
    gender: z.nativeEnum(Gender, {
      message: "Please select your gender",
    }),
    description: z.nativeEnum(Description, {
      message: "Please select a description of yourself",
    }),
  })
  .refine((data) => data.country_code && data.phoneNumber, {
    path: ["phoneNumber"],
    message: "Both country code and phone number are required",
  });

type FlagData = {
  url: string;
  alpha3: string;
  name: string;
  file_url: string;
  license: string;
};

export function PersonalInfo({ handleNext, handleGoBack }: Props) {
  const [dialCode, setDialCode] = useState("+234");
  const [selectedFlag, setSelectedFlag] = useState<string | undefined>(
    undefined
  );

  const { isMobile } = useMobileContext();
  const { data, setData, loading, setLoading } = useOnboardingFormStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: data?.onboardingDetails.first_name ?? "",
      lastName: data?.onboardingDetails.last_name ?? "",
      phoneNumber: data?.onboardingDetails.phone_number ?? "",
      country_code: data?.onboardingDetails.country_code ?? "",
      education_level: data?.onboardingDetails.education_level ?? "",
      dob: data?.onboardingDetails.date_of_birth ?? "",
      gender: data?.onboardingDetails.gender ?? "",
      description: data?.onboardingDetails.description ?? "",
    },
  });

  const {
    register,
    formState: { isValid },
  } = form;

  const [flags, setFlags] = useState<FlagData[]>([]);
  const [countriesData, setCountries] = useState<CountryListItemType[]>([]);

  const combinedData = countriesData
    .filter((country) => flags.some((f) => f.name === country.name))
    .map((country) => {
      const flag = flags.find((f) => f.name === country.name);
      return {
        ...country,
        flag: flag?.file_url || "",
      };
    });

  useEffect(() => {
    setCountries(countries);
    setFlags(countryFlags);

    if (data?.onboardingDetails.country_code) {
      const country = combinedData.find(
        (country) => country.dial_code === data?.onboardingDetails.country_code
      );
      if (country) {
        setDialCode(country.dial_code);
        setSelectedFlag(country?.flag);
      }
    }
  }, [combinedData, data?.onboardingDetails.country_code]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      setData({
        onboardingDetails: {
          ...data.onboardingDetails,
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phoneNumber,
          country_code: values.country_code,
          education_level: values.education_level,
          date_of_birth: values.dob,
          gender: values.gender,
          description: values.description,
        },
      });
      setTimeout(() => {
        handleNext();
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }
  const [descriptions, setDescriptions] = useState([]);
  useEffect(() => {
    const fetchDescriptions = () => {
      axios
        .get("https://reaps.vhdo.org/api/price-categories-by-context", {
          headers: { "institution-context": "ai" },
        })
        .then((response) => setDescriptions(response.data));
    };
    fetchDescriptions();
  }, []);
  console.log(descriptions, ">>>>>>");

  return (
    <>
      {loading && <Loader />}
      <div className="relative mx-auto my-0 w-full px-4 antialiased md:w-4/5 md:px-0">
        {!isMobile && <BackButton title="Back" goBack={handleGoBack} />}
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl2 pb-5 pt-10 text-center font-semibold md:py-5">
            Enter your Personal Information
          </h1>
        </div>
        <div className="mx-auto my-0 w-full max-w-[358px] md:w-3/5 md:max-w-[526px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormInput
                label="Your first name"
                placeholder="Jane"
                {...register("firstName", {
                  required: "This field is required",
                })}
                className="capitalize"
              />
              <FormInput
                label="Your last name"
                placeholder="Doe"
                {...register("lastName", {
                  required: "This field is required",
                })}
                className="capitalize"
              />
              <div className="flex gap-2">
                <div className="mt-2 flex flex-col text-xs">
                  <Label className="font-md">Country Code</Label>
                  <Select
                    onValueChange={(value: string) => {
                      // Find the selected country from the combinedData array
                      const selectedCountry: any = combinedData.find(
                        (country) => country.name === value
                      );

                      if (selectedCountry) {
                        // Update the dial code and selected flag
                        setDialCode(selectedCountry.dial_code);
                        setSelectedFlag(selectedCountry.flag);

                        // Set the country_code field in the form
                        form.setValue(
                          "country_code",
                          selectedCountry.dial_code
                        );
                      }
                    }}
                    value={form.getValues("country_code")}
                  >
                    <SelectTrigger className="mt-2 w-full min-w-[7.5rem] !gap-2">
                      <SelectValue placeholder="Select a country">
                        {selectedFlag ? (
                          <div className="flex w-full items-center gap-1">
                            <img
                              src={selectedFlag}
                              height="20px"
                              width="20px"
                              alt="Selected country flag"
                            />
                            <span>{dialCode}</span>
                          </div>
                        ) : (
                          "Select a country"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Country Codes</SelectLabel>
                        {combinedData?.map((country) => (
                          <SelectItem key={country.name} value={country.name}>
                            <div className="flex items-center justify-center gap-4">
                              <span>
                                <img
                                  src={country.flag}
                                  height="24px"
                                  width="24px"
                                  alt={country.name}
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
                    {...register("phoneNumber", {
                      required: "This field is required",
                    })}
                    className="no-spinner"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col text-xs">
                <Label>Education Level</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("education_level", value as EducationLevel)
                  }
                  value={form.watch("education_level")}
                >
                  <SelectTrigger className="mt-2 w-full min-w-[7.5rem]">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Education Level</SelectLabel>
                      {Object.values(EducationLevel).map((level) => {
                        const formattedLevel = level
                          .toLowerCase()
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase());

                        return (
                          <SelectItem key={level} value={level}>
                            {formattedLevel}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <div className="w-full">
                  <FormInput
                    label="Date of Birth"
                    type="date"
                    {...register("dob", {
                      required: "This field is required",
                    })}
                  />
                </div>
                <div className="w-full">
                  <Label>Gender</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("gender", value as Gender)
                    }
                    value={form.watch("gender")}
                  >
                    <SelectTrigger className="mt-2 w-full min-w-[7.5rem]">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        {Object.values(Gender).map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <Label>How would you describe yourself?</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("description", value as Description)
                    }
                    value={form.watch("description")}
                  >
                    <SelectTrigger className="mt-2 w-full min-w-[7.5rem]">
                      <SelectValue placeholder="Select description" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Description</SelectLabel>
                        {descriptions?.map(
                          (description: {
                            category: string;
                            description: string;
                            price: number;
                          }) => (
                            <SelectItem
                              key={description?.description}
                              value={description?.category}
                            >
                              {description?.category}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant={isValid ? "default" : "ghost"}
                className={`my-4 focus:outline-none`}
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PersonalInfo;
