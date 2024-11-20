import GreenCheckmark from "@/components/custom/Icons/GreenCheckmark";

export default function AddedInvestigator(
    { first_name, last_name, email, phone_number }: 
    { first_name: string, last_name: string, email: string, phone_number: string }) {
    return (
            <div className="w-full py-5 px-1 border border-[#0E0F0C1F] rounded-[1.25rem]">
                <div className="flex flex-col gap-[1.875rem] p-[0.625rem]">
                    <div className="flex flex-col flex-wrap gap-4 md:gap-[0.625rem] justify-center items-start">
                        <div className="grid md:grid-cols-2 w-full text-[#040C21] font-semibold">
                            <div className="flex gap-[0.625rem] w-full max-w-[11.875rem]">
                                <p className="text-xs">First Name:</p>
                                <p className="text-xs">{first_name}</p>
                            </div>
                            <div className="flex gap-[0.625rem] w-full max-w-[11.875rem] items-center md:justify-end">
                                <p className="text-xs">Last Name:</p>
                                <p className="text-xs">{last_name}</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 w-full text-[#040C21] font-semibold">
                            <div className="flex gap-[0.625rem] w-full flex-wrap min-w-[10.875rem] items-center">
                                <p className="text-xs">Email:</p>
                                <p className="text-xs text-wrap">{email}</p>
                            </div>
                            <div className="flex gap-[0.625rem] w-full min-w-[10.875rem] items-center md:justify-end">
                                <p className=" text-xs">Phone Number:</p>
                                <p className="text-xs">{phone_number}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border border-[#0C0C0F29] py-2 px-3 flex justify-between rounded-[0.625rem]">
                       <div className="flex gap-6 items-center">
                            <span><GreenCheckmark /></span>
                            <span className="text-sm text-[#515152]">Sponsor's attestation statement</span>
                       </div>
                       <div className="w-6 h-6 text-center">x</div>
                    </div>
                </div>
            </div>
        )
}