import DocAttachment from "./Icons/DocAttachment"
import Download from "./Icons/Download"
export default function TemplateCard() {
    return (
        <a href="" className={`relative w-full md:max-w-[17.5rem] flex flex-col gap-8 justify-left p-5 rounded-2xl border border-[#0C0C0F29]`} download>
            <div className="my-3 flex justify-between items-center text-[#868687]">
                <div className=" bg-black text-white border border-white w-[2.25rem] h-[2.25rem] rounded-[0.625rem] flex justify-center items-center">
                    <DocAttachment />
                </div>
                <Download />
            </div>
            <div className="text-black">
                <p className="text-sm font-bold">Registration/Submission guideline</p>
            </div>
        </a>
    )

}