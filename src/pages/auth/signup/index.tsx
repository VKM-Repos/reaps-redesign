import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  OnboardingFormStore,
  useOnboardingFormStore,
} from "@/store/CreateOnboardingFormStore";
import Loader from "@/components/custom/Loader";
import RegisterUser from "@/pages/auth/signup/create-account-form/RegisterUser";
import SendCode from "@/pages/auth/signup/create-account-form/SendCode";
import Password from "@/pages/auth/signup/create-account-form/RegisterPassword";
import RegisterSuccess from "@/pages/auth/signup/create-account-form/RegisterSuccess";
import PersonalInfo from "@/pages/auth/signup/create-account-form/PersonalInfo";

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { step, setStep, resetStore } = useOnboardingFormStore();
//   const { token } = useAppContext();

  const RenderForm = () => {
    const handleNext = () => {
      setStep(step + 1);
    };

    const handleGoBack = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    };

    const CreateOnboardingPage = async () => {
      setIsLoading(true);
      try {
        const { data } = useOnboardingFormStore.getState();
        // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // const endpoint = ${apiUrl}events;

        let formData = new FormData();
        formData.append("email", data?.onboardingDetails?.email);
        formData.append("code", data?.onboardingDetails?.code);
        formData.append("firstName", data?.onboardingDetails?.firstName);
        formData.append("lastName", data?.onboardingDetails?.lastName);
        formData.append("phoneNumber", data?.onboardingDetails?.phoneNumber);
        formData.append("password", data?.onboardingDetails?.password)
        

        setTimeout(() => {
          setIsLoading(false);
          resetStore()
        }, 5000)
        // wrap form components with transition framer-motion
        // if (data.image) {
        //   formData.append("image", data.image);
        // }

    //     const response: any = await axios.post(endpoint, formData, {
    //       headers: {
    //         Authorization: Bearer ${token},
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });

    //     if (response.status === 200) {
    //       setIsLoading(false);
    //       // console.log(response);
    //       const { id } = response?.data;
    //       // Handle success
    //       resetStore();
    //     } else {
    //       setIsLoading(false);
    //       // Handle other response statuses or errors
    //       toast.error(` ${response?.status}`);
        
      } catch (error: any) {
        // Handle network or other errors
        console.error("Error creating account:", error);
    
        // if (error?.response?.status == 401) {
        // }
      } finally {
        setIsLoading(false);
      }
    };

    const { handleSubmit } = useForm<OnboardingFormStore>();
    const onSubmitHandler: SubmitHandler<OnboardingFormStore> = async () => {
      await handleSubmit(CreateOnboardingPage)();
    };

    switch (step) {
      case 1:
        return <RegisterUser handleNext={handleNext} />;
      case 2:
        return (
          <SendCode handleNext={handleNext} handleGoBack={handleGoBack} />
        );
      case 3: 
        return (
          <PersonalInfo handleNext={handleNext} handleGoBack={handleGoBack} />
        );
      case 4:
        return (
          <Password handleNext={handleNext} handleGoBack={handleGoBack}
          />
        );
        case 5: 
         return (
          <RegisterSuccess handleNext={onSubmitHandler}/>
         )
      default:
        return null;
    }
  }

  return (
      <AnimatePresence initial={true} mode="wait">
          {isLoading && <Loader />}
          <RenderForm />
      </AnimatePresence>    
  );
}


// import toast from "react-hot-toast";
// import axios from "axios";
// import { useAppContext } from "@/lib/context/app-context";
// import { redirect, useRoutes } from "react-router-dom";
