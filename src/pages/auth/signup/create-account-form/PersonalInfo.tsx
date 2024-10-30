/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import BackButton from '@/components/custom/BackButton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/custom/FormInput';
import { Props } from '@/types/forms.types';
import { useOnboardingFormStore } from '@/store/CreateOnboardingFormStore';
import { useMobileContext } from '@/context/MobileContext';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import Loader from '@/components/custom/Loader';
import { countries, CountryListItemType } from 'country-list-json';
import countryFlags from '@/lib/data/countries.json';

enum EducationLevel {
  HIGH_SCHOOL = 'high_school',
  BACHELORS = 'bachelors',
  MASTERS = 'masters',
  PHD = 'phd',
}

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'Please fill this field' }),
  lastName: z.string().min(1, { message: 'Please fill this field' }),
  phoneNumber: z
    .string()
    .min(8, { message: 'Please fill this field' })
    .max(12, {
      message: 'Phone number should not contain more than 12 characters',
    })
    .regex(/^\d+$/, { message: 'Phone number should contain only numbers' }),
  education_level: z.nativeEnum(EducationLevel),
});

type FlagData = {
  url: string;
  alpha3: string;
  name: string;
  file_url: string;
  license: string;
};

export function PersonalInfo({ handleNext, handleGoBack }: Props) {
  const [dialCode, setDialCode] = useState('+93');
  const [selectedFlag, setSelectedFlag] = useState();
  const { isMobile } = useMobileContext();
  const { data, setData, loading, setLoading } = useOnboardingFormStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    formState: { isValid },
  } = form;

  const [flags, setFlags] = useState<FlagData[]>([]);
  const [countriesData, setCountries] = useState<CountryListItemType[]>([]);

  useEffect(() => {
    setCountries(countries);
    setFlags(countryFlags);
  }, []);

  const combinedData = countriesData
    .filter(country => flags.some(f => f.name === country.name))
    .map(country => {
      const flag = flags.find(f => f.name === country.name);
      return {
        ...country,
        flag: flag?.file_url || '',
      };
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // const dialNumber = dialCode + values.phoneNumber;
    setLoading(true);
    try {
      setData({
        onboardingDetails: {
          ...data.onboardingDetails,
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phoneNumber,
          country_code: dialCode,
          education_level: values.education_level,
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
              className="flex flex-col"
            >
              <FormInput
                label="Your first name"
                placeholder="Jane"
                {...register('firstName', {
                  required: 'This field is required',
                })}
                className="capitalize"
              />
              <FormInput
                label="Your last name"
                placeholder="Doe"
                {...register('lastName', {
                  required: 'This field is required',
                })}
                className="capitalize"
              />
              <div className="flex gap-2">
                <div className="mt-2 flex flex-col text-xs">
                  <Select
                    onValueChange={(value: string) => {
                      const selectedCountry: any = combinedData.find(
                        country => country.name === value
                      );
                      if (selectedCountry) {
                        setDialCode(selectedCountry.dial_code);
                        setSelectedFlag(selectedCountry.flag);
                      }
                    }}
                  >
                    <Label className="font-md">Country Code</Label>
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
                          'Select a country'
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Country Codes</SelectLabel>
                        {combinedData &&
                          combinedData.map(country => (
                            <SelectItem key={country.name} value={country.name}>
                              <div className="flex items-center justify-center gap-4">
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
                    {...register('phoneNumber', {
                      required: 'This field is required',
                    })}
                    className="no-spinner"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col text-xs">
                <Label>Education Level</Label>
                <Select
                  onValueChange={value =>
                    form.setValue('education_level', value as EducationLevel)
                  }
                >
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="high_school">High School</SelectItem>
                      <SelectItem value="bachelors">Bachelors</SelectItem>
                      <SelectItem value="masters">Masters</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant={isValid ? 'default' : 'ghost'}
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
