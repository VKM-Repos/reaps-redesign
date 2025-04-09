import { useGET } from "@/hooks/useGET.hook";
import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";
import SelectPaymentModel from "./select-payment-model";
import SelectPaymentGateway from "./select-payment-gateway";
import SelectPaymentType from "./select-payment-type";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const InstitutionConfigurationPage = () => {
  const { id } = useParams();

  // Fetch institution details
  const { data } = useGET({
    url: `institutions/${id}`,
    queryKey: ["GET-INSTITUTION-DETAILS", id],
    enabled: !!id,
  });

  // Fetch payment config
  const { data: payment_config } = useGET({
    url: `payment-configs/context/${data?.institution_context}`,
    queryKey: ["GET-PAYMENT-CONFIG", data?.institution_context],
    enabled: !!data?.institution_context,
  });

  const paymentType = useMemo(() => {
    return payment_config?.payment_type || "manual";
  }, [payment_config]);

  return (
    <InstitutionLayout>
      <TransitionElement>
        <div className="flex flex-col gap-y-[4rem] p-8">
          <Header title="Configuration" actions={null} />
          <div className="mx-auto my-0 flex w-full flex-col items-start justify-center gap-6 px-8">
            <h5 className="font-semibold text-lg">Payment type</h5>
            <SelectPaymentType
              type={paymentType}
              context={data?.institution_context}
            />

            {paymentType !== "manual" && (
              <>
                <h5 className="font-semibold text-lg">
                  Payment model and taxes
                </h5>
                <SelectPaymentModel />

                <h5 className="font-semibold text-lg">Payment gateway</h5>
                <SelectPaymentGateway />
              </>
            )}
          </div>
        </div>
      </TransitionElement>
    </InstitutionLayout>
  );
};

export default InstitutionConfigurationPage;
