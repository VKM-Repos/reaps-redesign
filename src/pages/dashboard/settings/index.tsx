import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
import { useState } from "react";
import { EducationSettings } from "./forms/EducationSettings";
import { ProfileSettings } from "./forms/ProfileSettings";
import { InstitutionSettings } from "./forms/InstitutionSettings";
import { PasswordSettings } from "./forms/PasswordSettings";
import { NotificationsSettings } from "./forms/NotificationsSettings";
import { EmailSettings } from "./forms/EmailSettings";
import UserSettingsIcon from "@/components/custom/Icons/UserSettingsIcon";
import MortarIcon from "@/components/custom/Icons/MortarIcon";
import NotificationIcon from "@/components/custom/Icons/NotificationIcon";
import LockIcon from "@/components/custom/Icons/LockIcon";
import MailIcon from "@/components/custom/Icons/MailIcon";
import ArrowDown from "/icons/arrow-down-01.svg"
import School from "@/components/custom/sidebar-icons/school";
import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";



export default function Settings() {
    const [isOpenIndex, setOpenIndex] = useState<number | null>();
    const { data } = useOnboardingFormStore();
    const email = data.onboardingDetails.email || 'johndoe@gmail.com';
    

    const handleToggle = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); 
      };

      const handleCloseCollapsible = () => {
        setOpenIndex(null);
      };

      const settings = [
        {
            title: "Profile",
            label: "Change your Personal Information",
            icon: <UserSettingsIcon />,
            content: <ProfileSettings onSave={handleCloseCollapsible} />
        },
        {
            title: "Email Settings",
            label: <span>{email}</span>,
            icon: <MailIcon />,
            content: <EmailSettings />
        },
        {
            title: "Institution",
            label: "Change your institution",
            icon: <School />,
            content: <InstitutionSettings onSave={handleCloseCollapsible} />
        },
        {
            title: "Education",
            label: "Update your education level and ORCID ID",
            icon: <MortarIcon />,
            content: <EducationSettings onSave={handleCloseCollapsible} />
        },
        {
            title: "Notifications",
            label: "Choose what we get in touch about",
            icon: <NotificationIcon />,
            content: <NotificationsSettings onSave={handleCloseCollapsible} />
        },
        {
            title: "Change Password",
            label: "********",
            icon: <LockIcon />,
            content: <PasswordSettings onSave={handleCloseCollapsible} />
        },
    ]
    
    

    return (
        <div className="flex flex-col gap-[1.25rem] mb-20">
            <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                <h1 className="text-[1.875rem] font-bold">Settings</h1>
            </div>
           
                {settings.map((setting, index) => (
                    <Collapsible 
                    key={index}
                    open={isOpenIndex === index}
                    onOpenChange={() => handleToggle(index)}
                    className="w-full"
                    >
                        <CollapsibleTrigger className="w-full">
                            <div className="flex gap-4 justify-between items-center w-full p-4">
                                <div className="flex gap-4 items-center">
                                    <div className="bg-accent p-2.5 rounded-full">{setting.icon}</div>
                                    <div className="gap-3 flex flex-col justify-center items-start text-[#040C21]">
                                        <div className="font-semibold">{setting.title}</div>
                                        <div className="text-sm text-left font-normal">{setting.label}</div>
                                    </div>
                                </div>
                               
                                <img src={ArrowDown} className={isOpenIndex === index ? 'rotate-180' : 'rotate-0'} />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="border-t border-[#0E0F0C1F] rounded-r-4 rounded-b-4 px-4 pb-6 pt-4">
                            {setting.content}
                        </CollapsibleContent>
                        </Collapsible>
                  
                ))}
        

        </div>
    )
}




