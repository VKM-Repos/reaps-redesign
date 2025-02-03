/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";
import LogOutLarge from "./Icons/LogOutLarge";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/user-store";
import { useCallback } from "react";
import { toast } from "../ui/use-toast";
import { queryClient } from "@/providers";

export default function Logout({ setLoading }: { setLoading: any }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { reset, refreshToken } = useUserStore();
  const navigate = useNavigate();

  const revokeToken = useCallback(async () => {
    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_APP_BASE_URL;
      const response = await fetch(
        `${baseURL}auth/token/revoke?token=${refreshToken}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Institution-Context": "ai",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || "error logging out";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw new Error(errorMessage);
      }

      toast({
        title: "See you again!",
        description: `Thanks for sticking around!`,
        variant: "default",
      });
      reset();
      queryClient.clear();
      navigate("/login");
    } catch (error) {
      console.error("Log out error:", error);
    } finally {
      setLoading(false);
    }
  }, [refreshToken, navigate, reset, setLoading]);

  const handleLogOut = () => {
    revokeToken();
  };

  return (
    <>
      <SheetContent
        side={isMobile ? "bottom" : "top"}
        className={` ${
          isMobile
            ? "inset-x-auto inset-y-0"
            : "inset-x-[30%] inset-y-auto rounded-3xl md:!pt-0"
        } mx-auto flex h-full w-full flex-col items-center justify-center px-2 md:max-h-[20.5rem] md:max-w-[30rem]`}
      >
        <div className="flex flex-col items-center justify-center gap-[2.5rem] border-none md:rounded-3xl">
          <div className="flex flex-col items-center gap-[9.75rem] md:gap-7">
            <div className="flex flex-col items-center gap-7">
              <LogOutLarge />
              <SheetHeader className="flex flex-col items-center justify-center gap-3">
                <SheetTitle className="text-xl2 font-bold">Log Out</SheetTitle>
                <SheetDescription className="text-sm text-[454745] md:text-center">
                  Are you sure you want to log out? You will lose any unsaved
                  changes
                </SheetDescription>
              </SheetHeader>
            </div>
            <div className="flex w-full items-center justify-center gap-10">
              <SheetClose className="w-full max-w-[12rem] p-0">
                <Button
                  variant="destructive"
                  className="w-full rounded-[2.75rem] !px-6 !py-3"
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  Log out
                </Button>
              </SheetClose>
              <SheetClose className="w-full max-w-[12rem] rounded-[2.75rem] border border-[#0C0C0F29] !px-6 !py-3 text-sm">
                Cancel
              </SheetClose>
            </div>
          </div>
        </div>
      </SheetContent>
    </>
  );
}
