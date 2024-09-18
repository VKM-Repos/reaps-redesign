export default function LoginGoogle() {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="pt-2 pb-8 text-sm">Trouble logging in? <a className="underline font-semibold text-black hover:text-black" href="" >Contact us</a></p>
            <div className="flex flex-col items-center justify-center">
                <p className="text-sm pt-2">Or Log in with</p>
                <button className="bg-inherit border-none focus:outline-none hover:outline-none no-transition"><img src="icons/google-frame.svg" alt="Google logo"></img></button>
            </div>            
        </div>
    )
}