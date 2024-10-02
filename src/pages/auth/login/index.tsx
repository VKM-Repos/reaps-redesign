import { LoginForm } from "./LoginForm"
import TopBar from "@/components/custom/TopBar"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <>
            <TopBar title=""/>
            <div className="w-4/5 mx-auto my-0 antialiased">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-xl2 font-semibold pt-10 pb-5 md:py-5">Welcome back.</h1>
                    <p className="pt-2 pb-10 text-sm">New to R.E.A.P.S? <a onClick={() => {navigate('/signup')}} className="underline font-semibold text-black hover:text-black">Sign up</a></p>
                </div>
                <div className="md:w-3/5 w-full max-w-[358px] md:max-w-[526px] mx-auto my-0">
                    <LoginForm/>
                </div>
                <p className="pt-2 pb-8 text-sm mx-auto max-w-fit">Trouble logging in? <a className="underline font-semibold text-black hover:text-black" href="https://www.vhdo.org/" target="_blank">Contact us</a></p>
            </div>
        </>
    )
}