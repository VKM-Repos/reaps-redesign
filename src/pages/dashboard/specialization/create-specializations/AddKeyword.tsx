import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import { useSpecializationsStore } from "@/store/specializationsFormStore";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Loader from "@/components/custom/Loader";

type Props = {
  handleNext: () => void;
};

const formSchema = z.object({
  keywords: z.string(),
});

export default function AddKeyword({ handleNext }: Props) {
  const { data, setData } = useSpecializationsStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    // reset,
    formState: { isValid },
  } = form;
  const [keyword, setKeyword] = useState<string>("");
  const [keywordsArray, setKeywordsArray] = useState<string[]>([]);

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

      // reset({ keywords: "" });
    }
  }

  function deleteKeyword(item: string) {
    setKeywordsArray(keywordsArray.filter((keywords) => keywords !== item));
  }

  function onSubmit() {
    setLoading(true);
    try {
      setData({
        specializationsDetails: {
          ...data.specializationsDetails,
          keyword: keywordsArray,
        },
      });

      handleNext();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {loading && <Loader />}
      <SheetHeader className="mt-16 px-1">
        <SheetTitle className="inter text-left text-[1.5rem] font-bold md:text-center">
          Awesome, now add some keywords
        </SheetTitle>
        <SheetDescription className="inter text-left text-sm text-[454745] md:text-center">
          Enter some keywords related to your research. Enter as many as you
          like separated by comma(,)
        </SheetDescription>
      </SheetHeader>
      <div className="mx-auto my-0 w-full px-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="!focus:border-none flex flex-col"
          >
            <FormInput
              {...register("keywords", {
                required: "This field is required",
                onChange: (e) => {
                  addKey(e as React.ChangeEvent<HTMLInputElement>);
                },
              })}
              value={keyword}
            />

            <div className="mt-8 flex w-full flex-wrap gap-2">
              {keywordsArray.map((item: string, index: number) => (
                <Badge
                  className="text-black flex items-center justify-center gap-1 bg-[#192C8A1A] capitalize hover:bg-[#192C8A1A]"
                  key={index}
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      deleteKeyword(item);
                    }}
                  >
                    <X size={12} />
                  </span>
                  {item}{" "}
                </Badge>
              ))}
            </div>
            <Button
              variant={
                isValid && keywordsArray.length > 0 ? "default" : "ghost"
              }
              disabled={!isValid || keywordsArray.length < 1}
              className={`mt-[2rem] focus:outline-none`}
            >
              Finish
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
