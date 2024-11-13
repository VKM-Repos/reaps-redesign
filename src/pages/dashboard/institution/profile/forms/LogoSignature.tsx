import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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

type LogoSignatureFormValues = z.infer<typeof logoSchema>;

export const LogoSignature = () => {
  const logoRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

  const { data: logoData } = useGET({
    url: "logos/details",
    queryKey: ["logo"],
    withAuth: true,
    enabled: true,
  });
  const { data: signatureData } = useGET({
    url: "signatures/details",
    queryKey: ["signature"],
    withAuth: true,
    enabled: true,
  });

  console.log(logoData);
  console.log(signatureData);

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
  } = useForm<LogoSignatureFormValues>({
    resolver: zodResolver(logoSchema),
  });

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

    // onSave();
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
                <img
                  src={logoPreview || ins_logo}
                  alt="Institution Logo"
                  className="w-[100px] aspect-square object-cover rounded-full"
                />
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
              </div>
              <input
                type="file"
                className="hidden"
                {...register("logo")}
                onChange={handleLogoChange}
              />
              <span className="text-red-500">{errors.logo?.message}</span>
            </div>
          </div>

          {/* Signature Upload */}
          <div>
            <span className="font-inter font-semibold text-md">
              Institution Signature
            </span>
            <div className="flex gap-7 items-center">
              <div className="bg-slate-300 rounded-full flex justify-center w-[100px] aspect-square object-cover">
                <img
                  src={
                    // signatureData.signature_path ||
                    signaturePreview || ins_signature
                  }
                  alt="Institution Signature"
                  className="w-[100px] aspect-square object-cover rounded-full"
                />
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
              </div>
              <input
                type="file"
                className="hidden"
                {...register("signature")}
                onChange={handleSignatureChange}
              />
              <span className="text-red-500">{errors.signature?.message}</span>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant={logoPreview || signaturePreview ? "default" : "ghost"}
          className="my-4 focus:outline-none py-4"
          disabled={isPendingLogo || isPendingSignature}
        >
          {isPendingLogo || isPendingSignature ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};
