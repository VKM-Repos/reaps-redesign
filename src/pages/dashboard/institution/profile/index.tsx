import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { AdddressSettings } from "./forms/Address";
import { ProfileSettings } from "./forms/ProfileSettings";

import ArrowDown from "/icons/arrow-down-01.svg";
import School from "@/components/custom/sidebar-icons/school";
// import { useOnboardingFormStore } from "@/store/CreateOnboardingFormStore";
import Location from "@/components/custom/Icons/Location";
import UserSetting from "@/components/custom/Icons/UserSetting";
import { LogoSignature } from "./forms/LogoSignature";

export default function InstitutionProfile() {
  const [isOpenIndex, setOpenIndex] = useState<number | null>();
  //   const { data } = useOnboardingFormStore();

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCloseCollapsible = () => {
    setOpenIndex(null);
  };

  const settings = [
    {
      title: "Profile",
      label: "Change your Institution information",
      icon: <School />,
      content: <ProfileSettings onSave={handleCloseCollapsible} />,
    },
    {
      title: "Institution Address",
      label: "Change your institution address",
      icon: <Location />,
      content: <AdddressSettings onSave={handleCloseCollapsible} />,
    },
    {
      title: "Institution Logo & Signature",
      label: "Change logo & signature",
      icon: <UserSetting />,
      content: <LogoSignature />,
    },
  ];

  return (
    <div className="flex flex-col gap-[1.25rem] mb-20">
      <div className="flex flex-col md:flex-row gap-5 md:gap-auto justify-between md:items-center mx-auto w-full">
        <h1 className="text-[1.875rem] font-bold">Institution Profile</h1>
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
                <div className="bg-accent p-2.5 rounded-full">
                  {setting.icon}
                </div>
                <div className="gap-3 flex flex-col justify-center items-start text-[#040C21]">
                  <div className="font-semibold">{setting.title}</div>
                  <div className="text-sm text-left font-normal">
                    {setting.label}
                  </div>
                </div>
              </div>

              <img
                src={ArrowDown}
                className={isOpenIndex === index ? "rotate-180" : "rotate-0"}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t border-[#0E0F0C1F] rounded-r-4 rounded-b-4 px-4 pb-6 pt-4">
            {setting.content}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
