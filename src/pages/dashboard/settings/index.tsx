import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
import { useState } from "react";
import { EducationSettings, EmailSettings, InstitutionSettings, NotificationsSettings, PasswordSettings, ProfileSettings } from "./forms";
import UserSettingsIcon from "@/components/custom/Icons/UserSettingsIcon";
import Bank from "@/components/custom/sidebar-icons/bank";
import MortarIcon from "@/components/custom/Icons/MortarIcon";
import NotificationIcon from "@/components/custom/Icons/NotificationIcon";
import LockIcon from "@/components/custom/Icons/LockIcon";
import MailIcon from "@/components/custom/Icons/MailIcon";


const settings = [
    {
        title: "Profile",
        label: "Change your Personal Information",
        icon: <UserSettingsIcon />,
        content: <ProfileSettings />
    },
    {
        title: "Email Settings",
        label: "holumidey22@gmail.com",
        icon: <MailIcon />,
        content: <EmailSettings />
    },
    {
        title: "Institution",
        label: "IChange your institution",
        icon: <Bank />,
        content: <InstitutionSettings />
    },
    {
        title: "Education",
        label: "Update your education level and ORCID ID",
        icon: <MortarIcon />,
        content: <EducationSettings />
    },
    {
        title: "Notifications",
        label: "Choose what we get in touch about",
        icon: <NotificationIcon />,
        content: <NotificationsSettings />
    },
    {
        title: "Change Password",
        label: "********",
        icon: <LockIcon />,
        content: <PasswordSettings />
    },
]


export default function Settings() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-[1.25rem] mb-20">
            <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
                <h1 className="text-[1.875rem] font-bold">Settings</h1>
            </div>
            <Collapsible 
                open={isOpen}
                onOpenChange={setOpen}>
                    {settings.map({title, label, icon, content}) => (
                        <CollapsibleTrigger>
                            <div className="w-full flex">

                            </div>
                        </CollapsibleTrigger>
                    )}
            </Collapsible>
        </div>
    )
}


