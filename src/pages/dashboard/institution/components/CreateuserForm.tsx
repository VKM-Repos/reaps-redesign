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
  FormMessage,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please fill this field.",
  }),
  lastName: z.string().min(1, {
    message: "Please fill this field.",
  }),
  email: z.string().email().min(1, {
    message: "Please fill this field.",
  }),
  phone: z
    .string()
    .min(1, { message: "Please fill this field" })
    .regex(/^\d+$/, { message: "Phone number should contain only numbers" }),
  gender: z.string().min(1, {
    message: "Please fill this field.",
  }),
  qualification: z.string({
    required_error: "Please select a language.",
  }),
});

type FlagData = {
  url: string;
  alpha3: string;
  name: string;
  file_url: string;
  license: string;
};
const languages = [
  { label: "Diploma", value: "en" },
  { label: "HND", value: "fr" },
  { label: "Bsc", value: "fr" },
  { label: "Msc", value: "fr" },
] as const;
export function CreateUserForm({
  handleClosDialog,
}: {
  handleClosDialog: () => void;
}) {
  const [countriesData, setCountries] = useState<CountryListItemType[]>([]);
  const [flags, setFlags] = useState<FlagData[]>([]);
  const [dialCode, setDialCode] = useState("+93");
  const [selectedFlag, setSelectedFlag] = useState();

  useEffect(() => {
    setCountries(countries);
    setFlags(countryFlags);
  }, []);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      qualification: "",
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
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-5  ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>

                  <FormMessage />
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

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-1">
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
              >
                <FormLabel className="font-md">Country Code</FormLabel>
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="8000000000" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="border border-input">
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Qualification</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="border border-input">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "Select qualification"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="rounded-lg border shadow-md w-[1200px] max-w-[1200px]">
                        <CommandInput placeholder="Search qualification..." />
                        <CommandList>
                          <CommandEmpty>No qualification found.</CommandEmpty>
                          <CommandGroup className="w-full text-black">
                            {languages.map((language) => (
                              <CommandItem
                                className="text-black"
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  console.log("click");

                                  form.setValue(
                                    "qualification",
                                    language.value
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-5 mt-14">
          <Button onClick={handleClosDialog} variant={"ghost"} type="button">
            Cancel
          </Button>
          <Button type="submit">Done</Button>
        </div>
      </form>
    </Form>
  );
}
