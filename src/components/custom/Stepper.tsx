import { motion } from "framer-motion";

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
  array: string[];
}

const Stepper: React.FC<StepperProps> = ({ step, setStep, array }) => {
  const totalSteps = array.length;
  const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="flex flex-col gap-4 w-full mx-auto min-w-[18.75rem] max-w-[32rem] my-0">
      {/* Progress Bar */}
      <div className="relative w-full mx-auto h-[2.5px] bg-gray-200 rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-[2.5px] gradient rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressWidth}%` }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1 w-[9px] h-[9px] bg-primary rounded-full"
          initial={{ left: "0%" }}
          animate={{ left: `${progressWidth}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step Buttons */}
      <div className="flex items-center justify-between w-full">
        {array.map((title, index) => {
          const stepIndex = index + 2;

          return (
            <button
              key={index}
              onClick={() => stepIndex <= step && setStep(stepIndex)}
              style={{
                cursor: stepIndex > step ? "not-allowed" : "pointer",
              }}
              className={`text-sm font-medium py-1 rounded letter-spacing-[1.25%] hidden lg:block ${
                step === stepIndex
                  ? "text-primary font-semibold"
                  : stepIndex <= step
                  ? "text-primary font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
