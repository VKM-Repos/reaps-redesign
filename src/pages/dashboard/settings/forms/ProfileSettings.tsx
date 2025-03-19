import { useForm } from "react-hook-form";
import FormInput from "@/components/custom/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useEffect, useMemo, useRef, useState } from "react";
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
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const formSchema = z.object({
  first_name: z.string().min(1, { message: "Please fill this field" }),
  last_name: z.string().min(1, { message: "Please fill this field" }),
  description: z.string().min(1, { message: "Please enter a category" }),
  phone_number: z
    .string()
    .min(1, { message: "Please fill this field" })
    .regex(/^\d+$/, {
      message: "Phone number should contain only numbers",
    }),
  country_code: z.string().min(1, { message: "Please enter a country code" }),
  date_of_birth: z.any(),
});



export const ProfileSettings = ({ onSave }: { onSave: () => void }) => {

  const [dialCode, setDialCode] = useState("+93");
  const [selectedFlag, setSelectedFlag] = useState<any>();   
  const [descriptions, setDescriptions] = useState([]);

  const { user, updateUser } = useUserStore();

  const dateRef = useRef<HTMLInputElement | null>(null);

  const defaultValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    description: user?.description || "",
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

  const countryCode = watch("country_code", defaultValues.country_code);

  const flagsMap = useMemo(
    () => new Map(countryFlags.map((flag) => [flag.name, flag.file_url])),
    []
  );
  
  const combinedData = useMemo(
    () =>
      countries
        .map((country) => ({
          ...country,
          flag: flagsMap.get(country.name) || "",
        }))
        .filter((country) => flagsMap.has(country.name)),
    [flagsMap]
  );


  const setCodeFlagData = (initialCountry: CountryListItemType) => {
    setDialCode(initialCountry.dial_code);
    setSelectedFlag(initialCountry.flag);
  }
  
  useEffect(() => {
    if (defaultValues.country_code) {
      const initialCountry = combinedData.find(
        (country) => country.dial_code === defaultValues.country_code
      );
      if (initialCountry) {
        setCodeFlagData(initialCountry)
      }
    }
  }, [defaultValues.country_code, combinedData]);

  useEffect(() => {
    fetchDescriptions();
  }, []);

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

  const  openDatePicker = () => {
    dateRef.current?.showPicker();
  };

  const fetchDescriptions = () => {
    axios
      .get(`${API_BASE_URL}price-categories-by-context`, {
        headers: { "institution-context": user?.institution_context ?? "ai" },
      })
      .then((response) => setDescriptions(response.data));
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
              <div className="flex gap-2">
                <div className="w-full">
                  <Label>Category</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("description", value)
                    }
                    value={form.watch("description")}
                  >
                    <SelectTrigger className="mt-2 w-full min-w-[7.5rem]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
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
                onClick={openDatePicker}
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
