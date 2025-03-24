import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import Unhappy from "@/assets/unhappy.svg";
import Smile from "@/assets/smile.svg";
import { usePATCH } from "@/hooks/usePATCH.hook";
import { useGET } from "@/hooks/useGET.hook";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/custom/Loader";

export function ActivateInstitution() {
  // const navigate = useNavigate();
  const { id } = useParams();

  const { mutate, isPending } = usePATCH(`institutions/${id}`);

  const { data: institution, isLoading } = useGET({
    url: `institutions/${id}`,
    queryKey: ["GET-INSTITUTION-DETAILS", id],
    enabled: !!id,
  });

  const isActive = institution?.status === "Active";
  const actionText = isActive ? "Deactivate" : "Activate";
  const actionVariant = !isActive ? "success" : "destructive";
  const newStatus = isActive ? "Not Active" : "Active";
  const image = isActive ? Unhappy : Smile;

  function handleInstitutionStatus() {
    mutate(
      { status: newStatus },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: `Institution has been set to "${newStatus.toLowerCase()}".`,
            variant: "default",
          });
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error.response?.data?.detail || "An error occurred",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <>
      {(isPending || isLoading) && <Loader />}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={actionVariant}
            className={`flex gap-4 items-center justify-center py-3 px-6 max-w-[16.75rem]`}
          >
            {actionText}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[35%] overflow-y-scroll h-full max-h-[40vh] my-auto p-12 no-scrollbar bg-white">
          <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <span>
              <img
                src={image}
                className="w-[80px] p-4 aspect-square border rounded-full"
                style={{
                  backgroundColor: isActive
                    ? "rgba(191, 30, 44, 0.1)"
                    : "rgba(52, 168, 83, 0.1)",
                  borderColor: isActive ? "#BF1E2C" : "#34A853",
                }}
                alt="remark"
              />
            </span>
            <DialogTitle className="text-center text-xl2 font-semibold font-inter">
              {`${actionText} Institution?`}
            </DialogTitle>
            <DialogDescription className="text-sm text-center">
              {`Are you sure?`}
            </DialogDescription>
            <DialogClose asChild>
              <span className="flex gap-10">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant={actionVariant}
                  onClick={handleInstitutionStatus}
                >
                  {actionText}
                </Button>
              </span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
