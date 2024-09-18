


const navLinks = [
    "Research Information",
    "Application Summary",
    "Supporting Document"
]

export default function SideBar() {
    return(
        <>
            <aside>
              {navLinks.map( (links)=>
                <p>{links}</p>
            )}
            </aside>
        </>
    );
}