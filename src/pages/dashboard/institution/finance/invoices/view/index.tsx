import ViewIcon from '@/assets/view.svg'
import { useNavigate } from "react-router-dom";

export default function ViewInvoice() {
    const navigate = useNavigate();
    const id = 1;
    return (
        <button onClick={() => {navigate(`/institution/finance-overview/invoice/${id}`)}} className={`text-black flex justify-center items-center gap-2`}>
            <span className="flex gap-3 items-center justify-center text-[#333740] text-sm">View <img src={ViewIcon} /></span>
        </button>
    )
}