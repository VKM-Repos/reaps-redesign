import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
const navLinks = [
    "Research Information",
    "Application Summary",
    "Supporting Document"
]

export default function SideBar() {
    return(
        <>
            <aside className='text-[0.875rem] hidden flex-col md:flex gap-5 w-[20%] fixed'>
              {navLinks.map( (links)=>
                <a className='w-[80%] h-12 rounded-md p-2 hover:bg-slate-200 active:bg-slate-200 text-inherit' href='#'>{links}</a>
            )}
            <Sheet>
                <SheetTrigger>
                      <Button className='rounded-full w-[80%] h-[3.5rem]'>Write your Review</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className='w-[50%] h-[90%] flex flex-col justify-self-center rounded-t-lg items-center'>
                        <h1 className='text-[1.7rem] font-bold'>Write your review</h1>
                        <p  className=' font-bold'>how satisfied are you with the quality of the request?</p>
                        <div className='flex w-[90%]'>
                            <div className=''></div>
                            <div className=''></div>
                            <div className=''></div>
                        </div>
                </SheetContent>
            </Sheet>
            </aside>
        </>
    );
}