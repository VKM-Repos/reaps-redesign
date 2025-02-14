import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

import { countries, CountryListItemType } from "country-list-json";
import countryFlags from "@/lib/data/countries.json";
import { usePOST } from "@/hooks/usePOST.hook";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/custom/Loader";
const FormSchema = z.object({
  first_name: z.string().min(1, {
    message: "Please fill this field.",
  }),
  last_name: z.string().min(1, {
    message: "Please fill this field.",
  }),
  email: z.string().email().min(1, {
    message: "Please fill this field.",
  }),
  phone_number: z
    .string()
    .min(1, { message: "Please fill this field" })
    .regex(/^\d+$/, { message: "Phone number should contain only numbers" }),
  country_code: z.string().min(1, { message: "Please fill this field" }),
  password: z.any(),
  role: z.string().min(1, { message: "Please fill this field" }),
  orcid: z.string().min(1, { message: "Please fill this field" }),
});

type FlagData = {
  url: string;
  alpha3: string;
  name: string;
  file_url: string;
  license: string;
};

export default function InstitutionAdminForm() {
  const [countriesData, setCountries] = useState<CountryListItemType[]>([]);
  const [flags, setFlags] = useState<FlagData[]>([]);
  const [dialCode, setDialCode] = useState("+234");
  const [selectedFlag, setSelectedFlag] = useState();

  const educationLevels = [{ title: "Admin", value: "high_school" }];

  useEffect(() => {
    setCountries(countries);
    setFlags(countryFlags);
  }, []);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      country_code: "+234",
      password: "password",
      role: "",
      orcid: "",
    },
  });
  const combinedData = countriesData
    .filter((country) => flags.some((f) => f.name === country.name))
    .map((country) => {
      const flag = flags.find((f) => f.name === country.name);
      return {
        ...country,
        flag: flag?.file_url || "",
      };
    });
  const { mutate, isPending } = usePOST("users");
  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.password = data.first_name + "_Password@123";
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Feedback",
          description: "User has been created.",
          variant: "default",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.response.data.detail,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-5  ">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-1">
                <div className="flex flex-col text-xs mt-2">
                  <FormField
                    control={form.control}
                    name="country_code"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value: string) => {
                            const selectedCountry: any = combinedData.find(
                              (country) => country.name === value
                            );
                            if (selectedCountry) {
                              field.onChange(selectedCountry.dial_code);
                              setDialCode(selectedCountry.dial_code);
                              setSelectedFlag(selectedCountry.flag);
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormLabel className="font-md">
                            Country Code
                          </FormLabel>
                          <FormControl>
                            <SelectTrigger className="min-w-[7.5rem] mt-2 !gap-2 w-full border border-input">
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
                                  <div className="flex items-center gap-2 w-full">
                                    <img
                                      src="//upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg"
                                      height="20px"
                                      width="20px"
                                      alt="Selected country flag"
                                    />
                                    <span>{dialCode}</span>
                                  </div>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Country Codes</SelectLabel>
                              {combinedData &&
                                combinedData.map((country) => (
                                  <SelectItem
                                    key={country.name}
                                    value={country.name}
                                  >
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
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="8000000000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Institutional Admin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationLevels &&
                          educationLevels.map((educationLevel) => (
                            <SelectItem value={educationLevel.value}>
                              {educationLevel.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orcid"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>ORCID</FormLabel>
                    <FormControl>
                      <Input placeholder="8000000000" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end items-center gap-5 mt-14">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
