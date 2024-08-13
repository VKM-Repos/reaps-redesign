// import { useState } from "react"


export default function Stepper() {
//     const [step, setStep] = useState(0.5)

//    const handleProgress = () => {
//     setStep(45);
//    }
    const step = 45;

    return (
       <div className="relative h-[8px] w-full max-w-[600px] mx-auto my-0 overflow-hidden rounded-full  flex items-center justify-center">
        <div className="relative bg-[#16330014] h-[4px] relative w-full rounded-full flex items-center justify-center">
            <div
            className="gradient w-full h-full absolute"
            style={{ transform: `translateX(-${100 - step}%)` }}
            ></div>
            <div
                className="rounded-full w-2 h-2 bg-secondary absolute"
                style={{ left: `calc(${step}% - 4px)` }}
            ></div>
        </div>
        
    </div>
);
}