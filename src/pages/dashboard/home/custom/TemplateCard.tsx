import DocAttachment from "../../../../components/custom/Icons/DocAttachment"
import Download from "../../../../components/custom/Icons/Download"
export default function TemplateCard({template}: {template: any}) {
    console.log("template", template)
    return (
        <div className={`relative w-full md:max-w-[17.5rem] flex flex-col gap-8 justify-left p-4 rounded-2xl hover:bg-[#14155E14] hover:border-none border border-[#0C0C0F29] card-shadow`}>
            <div className="my-3 flex justify-between items-center text-[#868687]">
                <div className=" bg-black text-white border border-white w-[2.25rem] h-[2.25rem] rounded-[0.625rem] flex justify-center items-center">
                    <DocAttachment />
                </div>
               <a href={template?.file_path} download> <Download /></a>
            </div>
            <div className="text-black">
                <p className="text-sm font-bold">Registration/Submission guideline</p>
            </div>
        </div>
    )

}