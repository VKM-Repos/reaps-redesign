import { Icons } from "@/components/Icons"
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";


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
             <img src="/img/linesMobile.png" alt="" className="md:hidden absolute right-0 w-[80%] z-[0] top-0" />
                <div>
                    <h2 className="text-[2rem] font-bold">Welcome, {name}</h2>
                    <p className="text-[0.88rem]">Here's an overview of the request that have been assigned to you.</p>
                </div>
                <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between w-full">
                    <Link to="/requests" className="text-black hover:text-black flex justify-between w-full min-w-[14rem]">
                        <div className="flex gap-[0.5rem] md:hover:bg-[#bfbfbf] group p-[0.5rem] rounded-[10px]">
                            <div className="w-[3rem] h-[3rem] rounded-[0.63rem] bg-[#66FFFF] flex justify-center items-center">{Icons.reviewed()}</div>
                            <div>
                                <p className="text-[0.8rem]">Reviewed Request</p>
                                <p className="text-[1.4rem] font-bold">{reviewed}</p>
                            </div>
                            <div className="group-hover:block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><BsArrowUpRight /></div>
                        </div>
                        
                    </Link>
                    <Link to="/requests" className="text-black hover:text-black w-full flex justify-between min-w-[14rem]">
                        <div className="flex gap-[0.5rem] md:hover:bg-[#bfbfbf] p-[0.5rem] rounded-[10px] group">
                            <div className="w-[3rem] h-[3rem] rounded-[0.63rem] bg-[#FFCCFF] flex justify-center items-center">{Icons.pending()}</div>
                            <div>
                                <p className="text-[0.8rem]">Pending Request</p>
                                <p className="text-[1.4rem] font-bold">{pending}</p>
                            </div>
                            <div className="group-hover:block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><BsArrowUpRight /></div>
                        </div>
                    </Link>
                </div>
                <img src="/img/note1.png" alt="" className="absolute bottom-[0px] left-[40%] md:hidden" />
                <img src="/img/reviewerAnimeMobile.webp" className="absolute bottom-[0px] md:hidden right-0" alt="" />
           </main>

           <aside className="w-[40%] relative hidden md:block">
                <img src="/img/lines.png" alt="" className="hidden md:block" />
                <img src="/img/note2.png" alt="" className=" absolute right-0 top-0" />
                <img src="/img/note1.png" alt="" className="absolute bottom-0" />
                <img src="/img/reviewerAnime.webp" className="absolute bottom-0 md:right-0" alt="" />
           </aside>
        </section>
    </div>
       );
}