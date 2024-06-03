import { ReactElement} from "react"

type Props = {
    icon: ReactElement;
    label: string;
    num: string;
    color: any;
}

//bg-${color}
export default function SummaryCard({ icon, label, num, color}: Props) {
    return (
        <div className={`relative w-full md:max-w-[17.5rem] flex flex-col justify-left rounded-2xl`} style={{backgroundColor: color}}>
            <div className="absolute -right-0 top-0">
                <img src="img/Ellipse-24.png" className="object-cover" alt="ellipse image" />
            </div>
            <div className="absolute -right-[1.5rem] -top-[1.6rem]">
                <img src="img/Ellipse-24.png" className="object-cover" alt="ellipse image" />
            </div>
            <div className="absolute -right-[2.5rem] -top-[3.6rem]">
                <img src="img/Ellipse-24.png" className="object-cover" alt="ellipse image" />
            </div>
            <div className="p-5 text-white">
                <div className="my-8 text-white border border-white w-[2.25rem] h-[2.25rem] rounded-[0.625rem] flex justify-center items-center">{icon}</div>
                <div className="text-white">
                    <p className="text-sm">{label}</p>
                    <h2 className="text-[1.875rem]">{num}</h2>
                </div>
            </div>
            
        </div>
    )
}