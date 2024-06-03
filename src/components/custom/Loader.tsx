export default function Loader() {
    return (
        <div className="fixed inset-0 z-[1000] w-screen h-screen bg-[#000000]/80 backdrop-blur-[4px] w-full flex justify-center items-center">
            <div className="relative">
                <img src="icons/loader.svg"></img>
            </div>
        </div>
    )
}