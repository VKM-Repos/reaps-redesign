import { TransitionElement } from "@/lib/transitions";
import InstitutionLayout from "../institution-layout";
import Header from "../header";

const InstitutionInformationPage = () => {
  return (
    <InstitutionLayout>
      <TransitionElement>
        <div className="flex flex-col gap-y-[4rem] p-8">
          <Header title="Information" actions={null} />
          <div className="mx-auto my-0 flex w-full flex-col items-center justify-center">
            hello
          </div>
        </div>
      </TransitionElement>
    </InstitutionLayout>
  );
};

export default InstitutionInformationPage;
