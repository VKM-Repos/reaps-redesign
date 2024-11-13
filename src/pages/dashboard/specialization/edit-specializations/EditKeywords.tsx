/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSpecializationsStore } from "@/store/specializationsFormStore";
import { SpecializationItems } from "@/types/specialization";

type Props = {
  data: SpecializationItems;
  handleNext: () => void;
};

const formSchema = z.object({
  keyword: z.string().optional(),
});

export default function EditKeyword({
  data: specializationDetails,
  handleNext,
}: Props) {
  const { data, setData } = useSpecializationsStore();
  const [keyword, setKeyword] = useState<string>("");

  const [keywordsArray, setKeywordsArray] = useState<string[]>(
    specializationDetails?.keywords.map((item) => item.keyword)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const {
    register,
    reset,
    formState: { isValid },
  } = form;

  useEffect(() => {
    // Update the form's validity status based on keywordsArray length
    form.trigger();
  }, [keywordsArray, form]);

  function addKey(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setKeyword(value);
    if (value.endsWith(",")) {
      const newKeywords = value.slice(0, -1).trim().split(",");
      const uniqueKeywords = newKeywords
        .filter((kw) => kw.trim())
        .map((kw) => kw.trim());
      setKeywordsArray((prev) => [
        ...prev,
        ...uniqueKeywords.filter((kw) => !prev.includes(kw)),
      ]);
      reset({ keyword: "" });
    }
  }

  function deleteKeyword(item: string) {
    setKeywordsArray(keywordsArray.filter((keywords) => keywords !== item));
  }

  function onSubmit() {
    if (keywordsArray.length > 0) {
      setData({
        specializationsDetails: {
          ...data.specializationsDetails,
          keyword: keywordsArray,
        },
      });
      handleNext();
    }
  }

  return (
    <>
      <SheetHeader className="mt-20 px-1 md:mt-16">
        <SheetTitle className="inter text-left text-[1.5rem] font-bold md:text-center">
          Edit Keywords
        </SheetTitle>
        <SheetDescription className="inter text-left text-sm text-[#454745] md:text-center">
          Add or delete keywords related to your specialization. Use commas to
          separate multiple keywords.
        </SheetDescription>
      </SheetHeader>
      <div className="mx-auto my-0 w-full px-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="!focus:border-none flex flex-col"
          >
            <FormInput
              {...register("keyword", {
                onChange: addKey,
              })}
              value={keyword}
            />
            {keywordsArray.length <= 0 && (
              <span className="text-red-500 mt-1 text-xs">
                Please add at least one keyword.
              </span>
            )}
            <div className="mt-8 flex w-full flex-wrap gap-2">
              {keywordsArray.map((item, index) => (
                <Badge
                  className="text-black flex items-center justify-center gap-1 bg-[#192C8A1A] capitalize hover:bg-[#192C8A1A]"
                  key={index}
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => deleteKeyword(item)}
                  >
                    <X size={12} />
                  </span>
                  {item}
                </Badge>
              ))}
            </div>

            <Button
              type="submit"
              variant={
                isValid && keywordsArray.length > 0 ? "default" : "ghost"
              }
              disabled={!isValid || keywordsArray.length <= 0}
              className="mt-[2rem] focus:outline-none"
            >
              Finish
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
