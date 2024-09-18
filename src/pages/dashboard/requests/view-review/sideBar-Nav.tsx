import { Button } from '@/components/ui/button'


const navLinks = [
    "Research Information",
    "Application Summary",
    "Supporting Document"
]

export default function SideBar() {
    return(
        <>
            <aside className='text-[0.875rem] flex-col flex gap-10'>
              {navLinks.map( (links)=>
                <p>{links}</p>
            )}
                <Button className='rounded-full w-[80%] h-[3.5rem]'>Write your Review</Button>
            </aside>
        </>
    );
}