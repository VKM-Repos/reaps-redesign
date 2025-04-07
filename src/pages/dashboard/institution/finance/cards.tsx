type FinanceCardsInfo = { 
    title: string, 
    value: string, 
    image: string, 
    bgColor: string, 
    percent: string, 
    percentColor: string
}


export default function FinanceCards(props: FinanceCardsInfo) {
        const { title, value, image, bgColor, percent, percentColor } = props;

        return (
        <div 
            style={{ backgroundColor: bgColor }} 
            className={`w-full min-w-[17.75rem] min-h-[10rem] rounded-2xl p-5`}
        >
            <div className="flex flex-col gap-5">
                <p className="text-[#323842] font-bold">{title}</p>
                <div className="flex justify-between pb-2">
                <div className="flex flex-col gap-5">
                    <p className="font-extrabold text-xl3">{value}</p>
                    <p className="text-sm font-semibold text-[#6E7787]">
                        <span style={{ color: percentColor }}>{percent}</span> from last week
                    </p>
                </div>
                {parseFloat(percent.replace('%', '')) > 0 && <img src={`${image}`} alt="Mock-up Bar Chart"/>}
                </div>
            </div>
        </div>
    )
}