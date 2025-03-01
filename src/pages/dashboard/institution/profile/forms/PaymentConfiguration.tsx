import PAYSTACK_LOGO from "/img/paystack_logo.png";
import SHARP_ARROW_DOWN from '@/assets/arrow-down-sharp.svg';

const payment_config_info = {
    payment_model: "Per submission",
    tax_type: "Fixed price per submission",
    tax_rate: "5%",
    bank_name: "Access bank",
    account_number: " 089393849",
    account_name: ""
}

export default function PaymentConfiguration() {

    const { 
        payment_model, 
        tax_rate, 
        tax_type, 
        bank_name, 
        account_name, 
        account_number } = payment_config_info;

    return (
        <section className="w-full my-0 rounded-b-3xl text-[#454745] drop-shadow">
            <ul className="list-none flex flex-col gap-6 pt-4 pr-4 pl-4 pb-6 w-full">
                <li className="flex flex-col gap-5">
                    <h2 className="font-bold text-black text-lg leading-6">Payment model and taxes</h2>
                    <div className="flex gap-5 items-center text-sm">
                        <label className="w-full">Payment model</label>
                        <p className="w-full min-w-[358px] min-h-[48px] py-[0.688rem] px-[0.938rem] border border-[#868687] rounded-[6px]">
                            {payment_model}
                        </p>
                    </div>
                </li>
                <li>
                    <ul className="flex flex-col p-5 gap-5 border border-[#0C0C0F29] rounded-[1.25rem] w-full">
                        <li className="flex gap-5 items-center w-full">
                            <div className="flex gap-5 justify-between items-center w-full text-sm">
                                <label className="w-full">Tax type</label>
                                <p className="min-w-[358px] min-h-[48px] py-[0.688rem] px-[0.938rem] border border-[#868687] rounded-[6px] w-full">
                                    {tax_type}
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-5 items-center w-full">
                            <div className="flex justify-between items-center w-full text-sm">
                                <label className="w-full">Tax rate (fixed or %)</label>
                                <p className="w-full min-w-[358px] min-h-[48px] py-[0.688rem] px-[0.938rem] border border-[#868687] rounded-[6px]">
                                    {tax_rate}
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>
                <li className="flex flex-col w-full gap-5">
                    <h2 className="font-bold text-black text-lg leading-6">Payment gateway</h2>
                    <ul className="flex flex-col p-5 gap-5 border border-[#0C0C0F29] rounded-[1.25rem] w-full">
                        <li className="text-left w-full">
                            <img src={PAYSTACK_LOGO} alt="Paystack logo" width={100} height={18} />
                        </li>
                        <li className="flex gap-5 items-center w-full">
                            <div className="flex justify-between items-center w-full text-sm">
                                <label className="w-full">Select bank</label>
                                <p className="w-full min-h-[48px] min-w-[358px] py-[0.688rem] px-[0.938rem] border border-[#868687] rounded-[6px] flex justify-between items-center">
                                    <span>{bank_name}</span>
                                    <img src={SHARP_ARROW_DOWN} alt="Arrow down logo" />
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-5 items-center w-full">
                            <div className="flex gap-5 justify-between items-center w-full">
                                <label className="w-full">Account number</label>
                                <p className="min-w-[358px] min-h-[48px] w-full py-[0.688rem] px-[0.938rem] border border-[#868687] rounded-[6px]">
                                    {account_number}
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-5 items-center w-full">
                            <div className="flex justify-between items-center w-full">
                                <label className="w-full">Account name</label>
                                <p className="min-w-[358px] min-h-[48px] w-full py-[0.688rem] px-[0.938rem] border border-[#868687] rounded-[6px]">
                                    {account_name}
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>    
    )
}