import PdfImage from "@/assets/document-pdf-image.png";

export default function EmptyState() {
    return (
        <div className="flex flex-col h-full min-h-[30rem] w-full items-start justify-center items-center p-4">
             <div className="w-[70px] h-[70px] mb-4  rounded-full flex justify-center items-center  ">
                <img src={PdfImage} />
            </div>
            <p>
                No data available.
            </p>
        </div>
    )
}