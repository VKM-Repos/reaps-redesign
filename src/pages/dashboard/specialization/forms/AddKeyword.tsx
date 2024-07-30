import { DialogClose, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
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


type Props = {
    handleNext: Function,
}

const formSchema = z.object({
    keyword: z
        .string()
        
})

export default function AddKeyword({handleNext}: Props) {
    const { data, setData, resetStore } = useSpecializationsStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { register, reset } = form;
    const [keyword, setKeyword] = useState<string>("");
    const [keywordsArray, setKeywordsArray] = useState<string[]>([]);

    
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
            handleNext();
            resetStore();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* <DialogContent className="px-2 md:max-w-[30rem] md:max-h-[26.5rem] rounded-3xl border-none px-6 pb-16 w-full flex flex-col gap-[2.5rem]"> */}
                <DialogHeader className="px-1 mt-16">
                    <DialogTitle className="font-bold text-[1.5rem] inter">Awesome, now add some keywords</DialogTitle>
                    <DialogDescription className="text-[454745] text-sm inter">Enter some keywords related to your research. Enter as many as you like separated by comma(,)</DialogDescription>
                </DialogHeader>
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
                            <DialogClose asChild>
                                <Button type="submit" variant={keywordsArray.length > 0 ? "default" : "ghost"} className={`focus:outline-none mt-[2rem]`}>Finish</Button>
                            </DialogClose> 
                        </form>
                    </Form>
                    </div>
            {/* </DialogContent> */}
        </>
    )
}
