import { Icons } from "@/components/Icons"
import { BsArrowUpRight } from "react-icons/bs";


type Props = {
    name: string;
    reviewed: any;
    pending: any;

}



export default function AssignedReuqustCard ({ name, reviewed, pending }: Props ) {
       return(
        <div className="z-[10]">
        <section className="w-full rounded-[20px] md:h-[282px] h-[25rem] bg-[#e1e1ea] flex justify-between text-[14px]">
           <main className="md:w-[60%] w-full p-[2.5rem] flex flex-col justify-between relative">
             <img src="/img/linesMobile.png" alt="" className="md:hidden absolute left-[20%] w-[80%] z-[0] bottom-[83%] " />
                <div>
                    <h2 className="text-[2rem] font-bold">Welcome, {name}</h2>
                    <p className="text-[0.88rem]">Here's an overview of the request that have been assigned to you.</p>
                </div>
                <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
                    <a href="/request" className="text-black"><div className="flex  gap-[0.5rem] md:hover:bg-[#bfbfbf] group p-[0.5rem] rounded-[10px]">
                        <div className="w-[3rem] h-[3rem] rounded-[0.63rem] bg-[#66FFFF] flex justify-center items-center">{Icons.reviewed()}</div>
                        <div>
                            <p className="text-[0.8rem]">Reviewed Request</p>
                            <p className="text-[1.4rem] font-bold">{reviewed}</p>
                        </div>
                        <div className="hidden md:group-hover:block "><BsArrowUpRight /></div>
                    </div></a>
                    <a href="request" className="text-black"><div className="flex gap-[0.5rem] md:hover:bg-[#bfbfbf] p-[0.5rem] rounded-[10px] group">
                        <div className="w-[3rem] h-[3rem] rounded-[0.63rem] bg-[#FFCCFF] flex justify-center items-center">{Icons.pending()}</div>
                        <div>
                            <p className="text-[0.8rem]">Pending Request</p>
                            <p className="text-[1.4rem] font-bold">{pending}</p>
                        </div>
                        <div className="hidden md:group-hover:block "><BsArrowUpRight /></div>
                    </div></a>
                </div>
                <img src="/img/note1.png" alt="" className="absolute bottom-[0px] left-[40%] md:hidden" />
                <img src="/img/reviewerAnimeMobile.webp" className="h-[] absolute bottom-[0px] md:hidden left-[64%]" alt="" />
           </main>

           <aside className="w-[40%] relative hidden md:block">
                <img src="/img/lines.png" alt="" className="hidden md:block" />
                <img src="/img/note2.png" alt="" className=" absolute left-[300px] top-[0px]" />
                <img src="/img/note1.png" alt="" className="absolute bottom-[0px]" />
                <img src="/img/reviewerAnime.webp" className="h-[] absolute bottom-[0px] md:left-[80px]" alt="" />
           </aside>
        </section>
    </div>
       );
}