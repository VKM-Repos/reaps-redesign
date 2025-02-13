import React from "react";
import InstitutionsSidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const InstitutionLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-full max-w-full fixed top-0 left-0 z-[4000] bg-white grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-2">
        <InstitutionsSidebar />
      </div>
      <div className="col-span-10 min-h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default InstitutionLayout;
