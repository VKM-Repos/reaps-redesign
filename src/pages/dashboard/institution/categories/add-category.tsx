import AddIcon from "@/components/custom/Icons/AddIcon";
import HoverCancel from "@/components/custom/Icons/HoverCancel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import Loader from "@/components/custom/Loader";
import { CategoryForm } from "./category-form";
import Edit from "@/components/custom/Icons/Edit";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { usePOST } from "@/hooks/usePOST.hook";
import { queryClient } from "@/providers";
import { toast } from "@/components/ui/use-toast";
import { useGET } from "@/hooks/useGET.hook";

type Category = {
  price: number;
  description: string;
  category: string;
};

export default function AddCategory({
  action,
  details,
}: {
  action: string;
  details?: Category;
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [open, setOpen] = useState(false);

  const { refetch } = useGET({
    queryKey: ["price", "categories"],
    url: "price-categories",
    withAuth: true,
  });

  const { mutate: editCategory, isPending: isEditing } = usePATCH(
    `price-categories/${details?.category}`,
    {
      contentType: "application/json",
      method: "PUT",
    }
  );

  const { mutate: addCategory, isPending: isAdding } = usePOST(
    "price-categories",
    {
      contentType: "application/json",
    }
  );

  const onSubmitHandler = async (
    data: Category,
    closeModal: (open: boolean) => void
  ) => {
    if (action === "update") {
      editCategory(data, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: `Category has been modified`,
            variant: "default",
          });

          queryClient.invalidateQueries({
            predicate: (query: any) =>
              query.queryKey.includes(["price", "categories"]),
          });
          refetch();
          closeModal(false);
        },
        onError: (error: any) => {
          const errorMessage = Array.isArray(error.detail)
            ? error.detail[0]?.msg || "An error occurred"
            : error.detail || "An unexpected error occurred";

          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        },
      });
    } else {
      addCategory(data, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: `Category has been created`,
            variant: "default",
          });

          queryClient.invalidateQueries({
            predicate: (query: any) =>
              query.queryKey.includes(["price", "categories"]),
          });
          refetch();
          closeModal(false);
        },
        onError: (error: any) => {
          const errorMessage = Array.isArray(error.detail)
            ? error.detail[0]?.msg || "An error occurred"
            : error.detail || "An unexpected error occurred";

          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        },
      });
    }
  };

  return (
    <>
      {isAdding || (isEditing && <Loader />)}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {action === "update" ? (
            <button>
              <Edit />
            </button>
          ) : (
            <Button className="flex max-w-[16.75rem] items-center justify-center gap-4 px-6 py-3">
              <span>
                <AddIcon />
              </span>
              Add New
            </Button>
          )}
        </SheetTrigger>
        <SheetContent
          side={isMobile ? "bottom" : "top"}
          className={` ${
            isMobile
              ? "inset-x-auto inset-y-0"
              : "inset-x-[30%] inset-y-auto rounded-3xl md:!pb-12 md:!pt-0"
          } mx-auto overflow-y-hidden px-2 w-full focus-visible:outline-none md:max-w-[30rem]`}
        >
          <SheetClose className="absolute right-6 mx-auto flex w-fit rounded-full !px-0 py-0 opacity-70 transition-opacity hover:bg-[#14155E14] hover:opacity-100 focus:outline-none disabled:pointer-events-none">
            <HoverCancel />
          </SheetClose>
          <div className="flex h-full w-full flex-col gap-[2.5rem] border-none md:max-h-[26.5rem]">
            <h4 className="font-semibold text-[1.4rem]">
              {action === "update" ? "Edit Category" : "Create a new category"}{" "}
            </h4>
            <CategoryForm
              details={details}
              onFormSubmission={(data) => onSubmitHandler(data, setOpen)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
