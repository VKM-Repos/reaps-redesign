import { Button } from "../../../../components/ui/button"
import GoogleDoc from "../../../../components/custom/Icons/GoogleDoc"
import GoogleDocLarge from "../../../../components/custom/Icons/GoogleDocLarge"


type Props = {
    handleNext: Function
}

export default function EmptyRequests({handleNext}: Props) {
    return (
        <div className="mx-auto my-0 w-full md:4/5 flex flex-col justify-center items-center">
            <div className="w-[96px] h-[96px] pl-2 mx-auto my-[6rem] rounded-full flex justify-center items-center bg-[#FFD13A] ">
                    <GoogleDocLarge />
            </div>
            <div className="flex flex-col gap-6 w-full max-w-[37rem] text-center">
                <h1 className="text-[1.625rem] leading-8 font-bold">Research ethics approval made easy</h1>
                <p>Enjoy efficiency, transparency, and accountability while eliminating material losses and communication delays in the review process</p>
                <Button onClick={() => {handleNext()}} className="flex gap-4 items-center justify-center py-3 px-6"><span><GoogleDoc /></span>Request Ethical Approval</Button>
            </div>
        </div>
        
    )
}