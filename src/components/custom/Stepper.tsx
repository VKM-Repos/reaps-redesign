import { useStepper } from "@/context/StepperContext";


const array = [
    "Application Info",
    "Research Info",
    "Supporting Docs",
    "Application Summary"
]

export default function Stepper() {
    const { step } = useStepper();
    const stepperPercentage = (step * 25) - 10;
    console.log(stepperPercentage)


    return (
        <div className="flex flex-col gap-4 w-full max-w-[600px] mx-auto my-0">
            <div className="relative h-[8px] w-full overflow-hidden rounded-full flex items-center justify-center">
                <div className="relative bg-[#16330014] h-[4px] relative w-full rounded-full flex items-center justify-center">
                    <div
                    className="gradient w-full h-full absolute"
                    style={{ transform: `translateX(-${100 - stepperPercentage}%)` }}
                    ></div>
                    <div
                        className="rounded-full w-2 h-2 bg-[#192C8A] absolute"
                        style={{ left: `calc(${stepperPercentage}% - 4px)` }}
                    ></div>
                </div>
                
            </div>
            <div className="flex justify-between items-center">
                {array.map((page, index) => (
                    <p
                        key={index}
                        className={`text-sm ${
                            stepperPercentage >= (index + 1) * (100 / array.length)
                                ? "font-bold text-black"
                                : "text-gray-500"
                        }`}
                    >
                        {page}
                    </p>
                ))}
            </div>
        </div>
       
);
}