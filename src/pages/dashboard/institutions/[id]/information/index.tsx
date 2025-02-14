import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InstitutionDetailsForm from "../../components/forms/institution-details-form";
import InstitutionAdminForm from "../../components/forms/institution-admin-form";

const InstitutionInformationPage = () => {
  const location = useLocation();
  const { institution } = location.state || {};

  return (
    <InstitutionLayout>
      <TransitionElement>
        <div className="flex flex-col gap-y-[4rem] p-8">
          <Header
            title="Information"
            actions={
              <Button
                variant={"outline"}
                className="border border-[#D03238] text-[#D03238]"
              >
                Deactivate
              </Button>
            }
          />{" "}
          <div>
            <h2 className="font-semibold">Institution Details</h2>
            <div className="w-full border rounded-xl px-5 py-7">
              <InstitutionDetailsForm institution={institution} />
            </div>
          </div>
          <div>
            <h2 className="font-semibold">Institution Administrator Details</h2>
            <div className="w-full border rounded-xl px-5 py-7">
              <InstitutionAdminForm />
            </div>
          </div>
        </div>
      </TransitionElement>
    </InstitutionLayout>
  );
};

export default InstitutionInformationPage;
