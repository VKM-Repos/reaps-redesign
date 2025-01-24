import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/custom/CustomFormField";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { useMediaQuery } from "react-responsive";
import { SheetClose, SheetContent } from "@/components/ui/sheet";
import HoverCancel from "@/components/custom/Icons/HoverCancel";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { useGET } from "@/hooks/useGET.hook";
import Loader from "@/components/custom/Loader";
import { toast } from "@/components/ui/use-toast";
import useUserStore from "@/store/user-store";
import { usePOST } from "@/hooks/usePOST.hook";

const formSchema = z.object({
  status: z.string().min(1, { message: "You have to select one item" }),
  comment: z.string().min(1, { message: "Please input some comment" }),
  correction_doc: z.instanceof(Blob, { message: "Please upload a file" }),
});

interface ReviewRemark {
  id: string;
  text: string;
  color: string;
  icon: string;
}

interface WriteReviewProps {
  request_id: string;
  request?: any;
  remarks: ReviewRemark[];
  buttonText: string;
  closeDialog: () => void;
  refetch: () => void;
}

export default function WriteReview({
  request_id,
  request,
  remarks,
  buttonText,
  closeDialog,
  refetch,
}: WriteReviewProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
      comment: "",
      correction_doc: [],
    },
  });
  const { activeRole } = useUserStore();
  const {
    formState: { isValid, errors },
    reset,
  } = form;

  const { data: reviewer_reviews, isPending: fetch_reviewers_review } = useGET({
    url: `reviews/reviewer`,
    queryKey: ["FETCH_REVIEW_BY_REVIEWER", request_id],
  });
  const review_id = reviewer_reviews?.items?.find(
    (item: any) => item.request?.id === request?.id
  )?.id;
  const { mutate: write_review, isPending: updating_review } = usePATCH(
    `reviews/${review_id}`,
    { method: "PATCH", contentType: "multipart/form-data" }
  );

  const { mutate: write_final_review, isPending: updating_final_review } =
    usePOST(`reviews/final-review/${request?.id}`, {
      contentType: "multipart/form-data",
    });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const send_review =
      activeRole === "admin" ? write_final_review : write_review;
    const formData = new FormData();
    formData.append("comment", values.comment);
    formData.append("status", values.status);
    formData.append("review_document", values.correction_doc);
    send_review(formData, {
      onSuccess: () => {
        toast({
          title: "Feedback",
          description: "Review has been sent.",
          variant: "default",
        });
        refetch();
        reset();
        closeDialog();
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
      {fetch_reviewers_review || updating_review || updating_final_review ? (
        <Loader />
      ) : (
        <WriteReviewWrapper>
          <div className="pb-6 px-6 mt-12 overflow-y-scroll scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1.5 scrollbar-thumb-gray-500">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
              >
                <div className="py-2 px-4 flex flex-col gap-6 w-full">
                  <div className="flex flex-col gap-[3.125rem] w-full">
                    <p className="text-xl2 font-semibold text-center">
                      Write your review
                    </p>
                    <div className="flex flex-col gap-5">
                      <p className="text-center text-lg font-semibold">
                        How satisfied are you with the quality of the request?
                      </p>
                      <div className="!w-full">
                        <FormField
                          control={form.control}
                          name="status"
                          render={() => (
                            <FormItem className="w-full flex flex-wrap gap-3 items-center justify-center">
                              {remarks.map((remark) => (
                                <FormField
                                  key={remark.id}
                                  control={form.control}
                                  name="status"
                                  render={({ field }) => (
                                    <FormItem className="!w-full min-w-[24rem] md:min-w-0 justify-self-end !my-0">
                                      <FormControl>
                                        <label
                                          className={
                                            "h-[5.5rem] w-full flex flex-col items-center justify-center rounded-lg gap-1 cursor-pointer !my-0"
                                          }
                                          style={{
                                            border:
                                              field.value === remark.text
                                                ? "0.2rem solid " + remark.color
                                                : "0.5px solid " + remark.color,
                                            color: `${remark.color}`,
                                          }}
                                        >
                                          <input
                                            type="radio"
                                            checked={
                                              field.value === remark.text
                                            }
                                            onChange={() =>
                                              field.onChange(remark.text)
                                            }
                                            hidden
                                          />
                                          <span
                                            style={{ color: `${remark.color}` }}
                                          >
                                            <img
                                              src={remark.icon}
                                              style={{
                                                color: `${remark.color}`,
                                              }}
                                            />
                                          </span>
                                          <span
                                            style={{ color: `${remark.color}` }}
                                          >
                                            {remark.text}
                                          </span>
                                        </label>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <p className="text-center text-lg font-semibold">
                        How satisfied are you with the quality of the request?
                      </p>
                      <div>
                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          name="comment"
                          error={errors["comment"]}
                          control={form.control}
                          placeholder="Enter comment"
                          className="!pb-[5rem] flex"
                        />
                      </div>
                    </div>
                    <div className="w-full max-w-[28rem]">
                      <CustomFormField
                        fieldType={FormFieldType.UPLOAD}
                        name="correction_doc"
                        error={errors["correction_doc"]}
                        control={form.control}
                        label="Correction/Explanatory Document"
                        labelClassName="!font-semibold text-sm text-[#040C21]"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <Button
                      variant={isValid ? "default" : "ghost"}
                      className="w-full max-w-[9.375rem]"
                    >
                      {buttonText}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </WriteReviewWrapper>
      )}
    </>
  );
}

const WriteReviewWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <>
      {isMobile ? (
        <SheetContent className="w-full h-full  pt-[1.25rem] pb-[1.125rem] flex flex-col gap-4">
          <SheetClose className="absolute right-6 top-6 !w-fit mx-auto py-0 px-0 ml-4 flex items-center justify-start opacity-70 rounded-full hover:bg-[#14155E14] transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
            <HoverCancel />
          </SheetClose>
          {children}
        </SheetContent>
      ) : (
        <DialogContent className="fixed !w-full !max-w-[56rem] h-[90%] mx-auto ">
          {children}
        </DialogContent>
      )}
    </>
  );
};
