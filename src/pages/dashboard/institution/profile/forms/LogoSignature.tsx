import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ins_logo from "@/assets/ins_logo.svg";
import ins_Signature from "@/assets/ins_signature.svg";
import Loader from "@/components/custom/Loader";
import Camera from "@/components/custom/Icons/Camera";

export const LogoSignature = ({ onSave }: { onSave: () => void }) => {
  const [loading, setLoader] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<File | string>("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [selectedSignature, setSelectedSignature] = useState<File | string>("");
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLInputElement>(null);

  const handleChooseLogo = () => {
    logoRef.current?.click();
  };
  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    setValidationError(false);
    if (imageFile) {
      // Update the logo in the store with the URL
      const imageUrl = URL.createObjectURL(imageFile);
      setLogoPreview(imageUrl);
      setSelectedLogo(imageFile);
      console.log(validationError);
      onSave();
    }
  };

  const handleChooseSignature = () => {
    signatureRef.current?.click();
  };
  const handleSignatureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = e.target.files?.[0];
    setValidationError(false);
    if (imageFile) {
      // Update the logo in the store with the URL
      const imageUrl = URL.createObjectURL(imageFile);
      setSignaturePreview(imageUrl);
      setSelectedSignature(imageFile);
    }
  };
  function onSubmit(e: any) {
    e.preventDefault();
    setLoader(true);
    console.log(selectedSignature, selectedLogo);
  }
  return (
    <>
      {loading && <Loader />}
      <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-8 text-xs mt-2">
            <div>
              <span className="font-inter font-semibold text-md">
                Institution Logo
              </span>
              <div className="flex gap-7 items-center">
                <div className="bg-slate-300 rounded-full flex justify-center w-[100px] aspect-square object-cover">
                  <img
                    src={logoPreview || ins_logo}
                    alt="Institution Logo"
                    className="w-[100px] aspect-square object-cover rounded-full"
                  />
                  <div className="relative flex items-end">
                    <span className="bg-white rounded-full w-9 h-9 flex justify-center items-center absolute -ml-10 cursor-pointer">
                      <Camera />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-inter font-semibold text-md">
                    Drop your photo here or{" "}
                    <input
                      ref={logoRef}
                      type="file"
                      className="hidden"
                      name="logo"
                      onChange={handleLogoChange}
                    />
                    <span
                      onClick={handleChooseLogo}
                      className="text-primary underline cursor-pointer"
                    >
                      select a file
                    </span>
                  </span>
                  <span>Supports JPG,PNG.</span>
                </div>
              </div>
            </div>
            <div>
              <span className="font-inter font-semibold text-md">
                Institution Signature
              </span>
              <div className="flex gap-7 items-center">
                <div className="bg-slate-300 rounded-full flex w-[100px] aspect-square object-cover">
                  <img
                    src={signaturePreview || ins_Signature}
                    alt="Institution Logo"
                    className="w-[100px] aspect-square object-cover rounded-full"
                  />
                  <div className="relative flex items-end">
                    <span className="bg-white rounded-full w-9 h-9 flex justify-center items-center absolute -ml-10 cursor-pointer">
                      <Camera />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-inter font-semibold text-md">
                    Drop your photo here or{" "}
                    <input
                      ref={signatureRef}
                      type="file"
                      className="hidden"
                      name="logo"
                      onChange={handleSignatureChange}
                    />
                    <span
                      onClick={handleChooseSignature}
                      className="text-primary underline cursor-pointer"
                    >
                      select a file
                    </span>
                  </span>
                  <span>Supports JPG,PNG.</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant={selectedLogo && selectedSignature ? "default" : "ghost"}
            className={`my-4 focus:outline-none py-4`}
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
};
