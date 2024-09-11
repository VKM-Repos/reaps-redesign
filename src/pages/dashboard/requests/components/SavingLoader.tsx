import { useEffect, useState } from "react"
import Recycle from "/icons/recycle-03.svg"
import { useMediaQuery } from "react-responsive";

export default function SavingLoader() {
    const [ saved, setSaved] = useState(true);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const handleLoader = () => {
        setTimeout(() => {
            setSaved(false)
        }, 3000)
    }

    useEffect(() => {
        handleLoader();
    })

    return (
        <>
            {!isMobile && 
            <div className="w-full flex justify-start items-center">
                {saved ? <p className="flex items-center justify-center gap-1 text-sm text-[#454745]"><span><img src={Recycle} /></span><span>Saving...</span></p> : <p className="flex items-center justify-center gap-1 text-sm text-[#454745]"><span><img src={Recycle} /></span><span>Saved</span></p>}
            </div>}
        </>
    )
}