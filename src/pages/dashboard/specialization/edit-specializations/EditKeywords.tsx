import { SheetClose, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Form } from "@/components/ui/form";
import { useSpecializationsStore } from "@/context/specializationsFormStore";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";
import HoverCancel from "@/components/custom/Icons/HoverCancel";



type Props = {
    keywordArray: string[];
    handleNext: Function;
    onSave: (keywordArray: string[]) => void,

}

const formSchema = z.object({
    keyword: z
        .string()
        
})

export default function EditKeyword({keywordArray, handleNext, onSave}: Props) {
    const { data, setData, resetStore } = useSpecializationsStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { register, reset } = form;
    const [keyword, setKeyword] = useState<string>("");
    const [keywordsArray, setKeywordsArray] = useState<string[]>(keywordArray);

   

    
    function addKey(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setKeyword(value);
        if (value.endsWith(",")) {
            const newKeywords = value.slice(0, -1).trim().split(",");
            const uniqueKeywords = newKeywords.filter(kw => kw.trim()).map(kw => kw.trim());
            setKeywordsArray((prev) => [...prev, ...uniqueKeywords.filter(kw => !prev.includes(kw))]);
            reset({ keyword: "" }); 
        }
       
    }

 
    function deleteKeyword (item: string) {
        setKeywordsArray(keywordsArray.filter(keywords => keywords !== item));
    }



    function onSubmit() {

        try {
            setData({
                specializationsDetails: {
                    ...data.specializationsDetails,
                    keyword: keywordsArray
                }
            });
            onSave(keywordsArray);
            handleNext();
            resetStore();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* {isLoading && <Loader />}  */}
            <SheetClose className="md:pr-4 w-[90%] md:absolute md:py-0 md:right-6 md:w-fit mx-auto py-4 !px-0 flex rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"><HoverCancel /></SheetClose>
            <SheetHeader className="px-1 mt-16">
                <SheetTitle className="font-bold text-[1.5rem] inter">Edit some keywords</SheetTitle>
                <SheetDescription className="text-[454745] text-sm inter">Delete or add more keywords related to your research. Enter as many as you like separated by comma(,)</SheetDescription>
            </SheetHeader>
            <div className="w-full mx-auto my-0 px-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col !focus:border-none">
                        <FormInput
                            {...register("keyword", {
                            required: "This field is required",
                            onChange: (e) => { addKey(e as React.ChangeEvent<HTMLInputElement>) }
                            })}
                            value={keyword}
                            className="!focus:border-none"
                        />
                        <div className="flex gap-2 w-full flex-wrap mt-8">
                        {keywordsArray.map((item, index) => (
                            <Badge className="text-black bg-[#192C8A1A] flex gap-1 items-center justify-center hover:bg-[#192C8A1A]" key={index}><span className="cursor-pointer" onClick={() => {deleteKeyword(item)}}><X size={12}/></span>{item} </Badge>
                        ))}
                        </div>
                        <SheetClose asChild>
                            <Button type="submit" variant={keywordsArray.length > 0 ? "default" : "ghost"} className={`focus:outline-none mt-[2rem]`}>Finish</Button>
                        </SheetClose> 
                    </form>
                </Form>
                </div>

        </>
    )
}
