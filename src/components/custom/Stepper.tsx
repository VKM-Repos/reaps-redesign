import { useStepper } from "@/context/StepperContext";
import { useEffect, useRef, useState } from "react";

type Props = {
    setStep: (step: number) => void,
    step: number,
    array: string[]
}
   

const totalWidth = 600;

export default function Stepper( { setStep, step, array }: Props) {
    const { stepper, setStepper } = useStepper();
    const [ball, setBall] = useState<number>(8);
    const [stepWidths, setStepWidths] = useState<number[]>([]);
    const stepRefs = useRef<(HTMLParagraphElement | null)[]>([]);


    const updateBall = (step: number) => {
        if (step === 0) {
            setBall(0)
        }
        else {
            setBall(8)
        }
    }

    const handleStepClick = (index: number) => {
        if (index <= stepper) {
            setStep(index + 2);
            setStepper(index);
        }
    }


    const calculateGap = () => {
        const totalStepsWidth = stepWidths.reduce((acc, width) => acc + width, 0);
        const totalGaps = array.length - 1;
        const remainingSpace = totalWidth - totalStepsWidth;

        return remainingSpace / totalGaps;
    };


    const calculatePosition = (index: number) => {
        const gap = calculateGap();

        let totalWidthSoFar = 0;
        if (index === 0) return 0;
        if (index === array.length - 1) return 100;
        for (let i = 0; i < index; i++) {
            totalWidthSoFar += stepWidths[i] + gap;
        }

        const middleOfCurrentStep = stepWidths[index] / 2;
        const position = (totalWidthSoFar + middleOfCurrentStep) / totalWidth * 100;

        return position;
    };

    useEffect(() => {
        if (step !== stepper + 1) {
            setStepper(step - 1); // Sync stepper with step
          }
        const widths = stepRefs.current.map((step) =>
            step ? step.getBoundingClientRect().width : 0    
        );
        updateBall(stepper);
        setStepWidths(widths);
    }, [stepper]);

    const stepPosition = stepWidths.length ? calculatePosition(stepper) : 0;


    return (
        <div className="flex flex-col gap-4 w-full min-w-[18.75rem] max-w-[32rem] my-0">
            <div className="relative h-[9px] w-full overflow-hidden rounded-full flex items-center justify-center">
                <div className="relative bg-[#16330014] h-[2px] relative w-full rounded-full flex items-center justify-center">
                    <div
                    className="gradient w-full h-full absolute"
                    style={{ transform: `translateX(-${100 - (stepPosition )}%)` }}
                    ></div>
                    <div
                        className="rounded-full w-2 h-2 bg-[#192C8A] absolute"
                        style={{ left: `calc(${stepPosition}% - ${ball}px)` }}
                    ></div>
                </div>
                
            </div>
            <div className="flex justify-between items-center">
            {array.map((label, index) => {
                    let textColor = "text-[#454745]"; 
                    let fontWeight = "font-[400]";

                    if (stepper > index) {
                        fontWeight = "font-[600]";
                    } else if (stepper === index) {
                        textColor = "text-black"; 
                        fontWeight = "font-[600]";
                    }
                    // update stepper to click on step names

                    return (
                        <p
                            key={index}
                            ref={(el) => (stepRefs.current[index] = el)}
                            className={`${textColor} ${fontWeight} text-sm letter-spacing-[1.25%] hidden lg:block`}
                            style={{ cursor: index > stepper ? 'not-allowed' : 'pointer' }}
                            onClick={() => {handleStepClick(index)}}
                        >
                            {label}
                        </p>
                    );
                })}
            </div>
        </div>
       
);
}