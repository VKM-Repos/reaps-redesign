import { useRef, useState, useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ins_logo from "@/assets/ins_logo.svg";
import ins_signature from "@/assets/ins_signature.svg";
import Camera from "@/components/custom/Icons/Camera";
import { usePOST } from "@/hooks/usePOST.hook";
import { toast } from "@/components/ui/use-toast";
import { useGET } from "@/hooks/useGET.hook";

const logoSchema = z.object({
  logo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      {
        message: "Logo must be a JPG or PNG image",
      }
    ),
});

const signatureSchema = z.object({
  signature: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      {
        message: "Signature must be a JPG or PNG image",
      }
    ),
});

type LogoSignatureFormValues = {
  logo?: File;
  signature?: File;
};

export const LogoSignature = () => {
  const logoRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

  const {
    data: logoData,
    isPending: isLogoLoading,
    isError: logoError,
    refetch: refetchLogo,
  } = useGET({
    url: "logos/details",
    queryKey: ["logo"],
    withAuth: true,
    enabled: true,
  });
  const {
    data: signatureData,
    isPending: isSignatureLoading,
    isError: signatureError,
    refetch: refetchSignature,
  } = useGET({
    url: "signatures/details",
    queryKey: ["signature"],
    withAuth: true,
    enabled: true,
  });

  const { mutate: uploadLogo, isPending: isPendingLogo } = usePOST("logos", {
    contentType: "multipart/form-data",
    callback: (data) => {
      setLogoPreview(data.logo_path);
      toast({
        title: "Feedback",
        description: "Logo uploaded successfully",
      });
    },
  });

  const { mutate: uploadSignature, isPending: isPendingSignature } = usePOST(
    "signatures",
    {
      contentType: "multipart/form-data",
      callback: (data) => {
        setSignaturePreview(data.signature_path);
        toast({
          title: "Feedback",
          description: "Signature uploaded successfully",
        });
      },
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<LogoSignatureFormValues>({
    resolver: zodResolver(z.union([logoSchema, signatureSchema])),
  });

  const watchedLogo = useWatch({
    control,
    name: "logo",
  });

  const watchedSignature = useWatch({
    control,
    name: "signature",
  });

  useEffect(() => {
    if (logoData?.logo_path) {
      setLogoPreview(logoData.logo_path);
    }
    if (signatureData?.signature_path) {
      setSignaturePreview(signatureData.signature_path);
    }
  }, [logoData, signatureData]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setValue("logo", file);
    }
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSignaturePreview(URL.createObjectURL(file));
      setValue("signature", file);
    }
  };

  const onSubmit: SubmitHandler<LogoSignatureFormValues> = ({
    logo,
    signature,
  }) => {
    if (logo) {
      const logoFormData = new FormData();
      logoFormData.append("file", logo);
      uploadLogo(logoFormData);
    }

    if (signature) {
      const signatureFormData = new FormData();
      signatureFormData.append("file", signature);
      uploadSignature(signatureFormData);
    }
  };

  return (
    <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] my-0">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-8 text-xs mt-2">
          {/* Logo Upload */}
          <div>
            <span className="font-inter font-semibold text-md">
              Institution Logo
            </span>

            <div className="flex gap-7 items-center">
              <div className="bg-slate-300 rounded-full flex justify-center w-[100px] aspect-square object-cover">
                {isLogoLoading ? (
                  <div className="w-[100px] aspect-square bg-gray-200 animate-pulse rounded-full" />
                ) : (
                  <img
                    src={logoPreview || ins_logo}
                    alt="Institution Logo"
                    className="w-[100px] aspect-square object-cover rounded-full"
                  />
                )}
                <div className="relative flex items-end">
                  <span
                    onClick={() => logoRef.current?.click()}
                    className="bg-white rounded-full w-9 h-9 flex justify-center items-center absolute -ml-10 cursor-pointer"
                  >
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
                    onClick={() => logoRef.current?.click()}
                    className="text-primary underline cursor-pointer"
                  >
                    select a file
                  </span>
                </span>
                <span>Supports JPG,PNG.</span>
                <span className="text-red-500">{errors.logo?.message}</span>
                {logoError && (
                  <p className="text-red-500">
                    Cannot fetch logo{" "}
                    <span
                      className="text-black font-semibold cursor-pointer hover:underline"
                      onClick={() => refetchLogo()}
                    >
                      Try Again
                    </span>
                  </p>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                {...register("logo")}
                onChange={handleLogoChange}
              />
            </div>
          </div>

          {/* Signature Upload */}
          <div>
            <span className="font-inter font-semibold text-md">
              Institution Signature
            </span>
            <div className="flex gap-7 items-center">
              <div className="bg-slate-300 rounded-full flex justify-center w-[100px] aspect-square object-cover">
                {isSignatureLoading ? (
                  <div className="w-[100px] aspect-square bg-gray-200 animate-pulse rounded-full" />
                ) : (
                  <img
                    src={signaturePreview || ins_signature}
                    alt="Institution Signature"
                    className="w-[100px] aspect-square object-cover rounded-full"
                  />
                )}
                <div className="relative flex items-end">
                  <span
                    onClick={() => signatureRef.current?.click()}
                    className="bg-white rounded-full w-9 h-9 flex justify-center items-center absolute -ml-10 cursor-pointer"
                  >
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
                    name="signature"
                    onChange={handleSignatureChange}
                  />
                  <span
                    onClick={() => signatureRef.current?.click()}
                    className="text-primary underline cursor-pointer"
                  >
                    select a file
                  </span>
                </span>
                <span>Supports JPG,PNG.</span>
                <span className="text-red-500">
                  {errors.signature?.message}
                </span>
                {signatureError && (
                  <p className="text-red-500">
                    Cannot fetch signature{" "}
                    <span
                      className="text-black font-semibold cursor-pointer hover:underline"
                      onClick={() => refetchSignature()}
                    >
                      Try Again
                    </span>
                  </p>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                {...register("signature")}
                onChange={handleSignatureChange}
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant={`${watchedLogo || watchedSignature ? "default" : "ghost"}`}
          className="my-4 focus:outline-none py-4"
          disabled={isPendingLogo || isPendingSignature}
        >
          {isPendingLogo || isPendingSignature
            ? "Uploading..."
            : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};
