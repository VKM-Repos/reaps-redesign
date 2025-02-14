import React from "react";
import InstitutionsSidebar from "./sidebar";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const InstitutionLayout = ({ children }: Props) => {
  const location = useLocation();
  const { institution } = location.state || {};
  return (
    <div className="h-screen w-full max-w-full fixed top-0 left-0 z-[4000] bg-white grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-2">
        <InstitutionsSidebar institution={institution} />
      </div>
      <div className="col-span-10 min-h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default InstitutionLayout;
