import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";
import SelectPaymentModel from "./select-payment-model";
import SelectPaymentGateway from "./select-payment-gateway";

const InstitutionConfigurationPage = () => {
  return (
    <InstitutionLayout>
      <TransitionElement>
        <div className="flex flex-col gap-y-[4rem] p-8">
          <Header title="Configuration" actions={null} />
          <div className="mx-auto my-0 flex w-full flex-col items-start justify-center gap-6 px-8">
            <h5 className="font-semibold text-lg">Payment model and taxes</h5>
            <SelectPaymentModel />

            <h5 className="font-semibold text-lg">Payment gateway</h5>
            <SelectPaymentGateway />
          </div>
        </div>
      </TransitionElement>
    </InstitutionLayout>
  );
};

export default InstitutionConfigurationPage;
