import { useMobileContext } from "@/context/MobileContext";
import { useNavigate } from "react-router-dom";

type Props = {
    goBack: Function,
    title?: string,
    className?: string
}

export default function BackButton({ goBack, title, className}: Props) {
    const navigate = useNavigate();
    const { isMobile } = useMobileContext();

    const backFunc = () => {
        !!goBack ? goBack() : navigate(-1);
    };

    return(
        <>
            <button className={`bg-transparent mt-4 left-0 flex gap-2 ${className}`} onClick={backFunc}>
                <img src="icons/arrow-left-02.svg" />
                <div className="flex flex-col justify-center items-center">
                    <span className="text-base font-black">
                        {title}
                    </span>
                    {!isMobile && <div className="pt-1">
                        <img src="icons/rectangle.svg" />
                    </div>}
                </div>
                
            </button>
        </>
    )
    
}