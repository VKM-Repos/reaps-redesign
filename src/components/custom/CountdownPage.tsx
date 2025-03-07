import ConstructionImg from "@/assets/under-construction.jpg"
import { useEffect, useState } from "react";

export default function CountdownPage() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
  
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    
    return (
        <article className="h-[100dvh] w-full max-w-[80%] mx-auto mb-4">
            <figure className="flex items-center justify-center">
                <img src={ConstructionImg} alt="Workers setting up REAPS" />
            </figure>
            <div className="flex flex-col gap-4 items-center justify-center font-dmSans">
                <h1 className="text-xl3 text-primary font-bold">REAPS is Updating</h1>
                <div className="flex flex-col items-center justify-center gap-[3.25rem]">
                    <p className="text-xl text-[#515152] text-center">
                        We are currently deploying the latest version of REAPS to enhance your experience. 
                        During this process, the site will be temporarily unavailable. 
                        We will be back in
                    </p>
                    <p className="text-black text-[5.25rem] leading-[2.25rem] font-extrabold font-dmSans">
                        {timeLeft.days}: {timeLeft.hours}: {timeLeft.minutes}: {timeLeft.seconds}
                    </p>
                    <p className="text-[#515152] italic font-dmSans">For urgent inquiries, please contact support at <a className="text-primary underline" href="mailto:reaps@viableknowledgemasters.com">reaps@viableknowledgemasters.com</a></p>
                </div>
            </div>
        </article>
    )
}