import ReactDOM from 'react-dom';
import LoadingIcon from "./LoadingIcon";

function Loader() {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100000] w-screen h-screen bg-[#000000]/30 backdrop-blur-[6px] flex justify-center items-center">
            <div className="relative">
                <LoadingIcon  />
            </div>
        </div>,
        document.body // Mount the loader directly in the body
    );
}

export default Loader;