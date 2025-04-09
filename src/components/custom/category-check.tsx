import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

export function CategoryChecks({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button className="hidden" variant="outline">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[492px] py-5 px-7"
      >
        <DialogHeader>
          <div className="flex justify-center">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="71"
                height="71"
                rx="35.5"
                fill="#BF1E2C"
                fill-opacity="0.2"
              />
              <rect
                x="0.5"
                y="0.5"
                width="71"
                height="71"
                rx="35.5"
                stroke="#E74848"
              />
              <path
                d="M30 46.5C30.6877 49.0878 33.1133 51 36 51C38.8868 51 41.3123 49.0878 42 46.5M21.7949 40.1544C21.4759 42.2454 22.902 43.6968 24.6481 44.4201C31.3422 47.1933 40.6578 47.1933 47.3519 44.4201C49.098 43.6968 50.5241 42.2454 50.2052 40.1544C50.0091 38.8693 49.0398 37.7993 48.3216 36.7544C47.381 35.369 47.2875 33.8577 47.2874 32.25C47.2874 26.0368 42.2339 21 36 21C29.7662 21 24.7127 26.0368 24.7127 32.25C24.7125 33.8577 24.6191 35.369 23.6784 36.7544C22.9603 37.7993 21.9909 38.8693 21.7949 40.1544Z"
                stroke="#E74848"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-5 justify-center items-center">
          <h2 className="font-semibold text-[26px]">Attention!</h2>
          <p className="text-center text-[#454745]">
            You need to select a category that before you can request for
            ethical approval
          </p>
        </div>
        <DialogFooter className="mt-5">
          <Button
            onClick={() => navigate("/settings")}
            className="w-full"
            variant={"outline"}
          >
            Go to Profile page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
