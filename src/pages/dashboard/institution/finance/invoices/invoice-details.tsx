import { Link } from "react-router-dom";

import Reapslogo from "/icons/full_logo.svg";
import Unpaid from "/icons/unpaid.svg";

import { Button } from "@/components/ui/button";
import LeftArrow from "@/components/custom/Icons/LeftArrow";

export default function InvoiceDetails() {
  return (
    <div className="w-[80%] mx-auto border border-[#0E0F0C1F] rounded-xl px-8 py-5 my-10">
      <div className="flex flex-col items-center w-full">
        <Link className="flex items-center gap-2" to="/institution/finance-overview/invoice">
          <LeftArrow /> Back to Dashboard
        </Link>
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col justify-start items-start gap-3 text-[#515152]">
            <img
              className="hidden md:block"
              src={Reapslogo}
              alt="Reap logo for website"
            />
            <p className="w-[221px] text-[16] font-semibold">
              Viable Knowledge Masters
            </p>

            <p className="w-[204px]">
              Plot C114 Platinum Plaza, Second Floor 1st Avenue, Gwarinpa, FCT -
              Abuja. Abuja, Nigeria.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <img className="-mr-2" src={Unpaid} alt="Payment status" />
            <Button variant={"default"}>Pay now</Button>
            <div className="flex flex-col items-end gap-1">
              <p>#INV-0897</p>
              <p>Invoice date: 29 Feb 2024</p>
              <p>Due Date: 29 Feb 2024</p>
            </div>
          </div>
        </div>
        <div className="w-full px-10 my-[100px] ">
          <div className="flex justify-between items-start bg-[#EFF4FD] h-[203px] px-6 py-7 rounded-lg">
            <div className="flex flex-col justify-start items-start gap-3 ">
              <p className="font-bold text-[30px]">Invoice to</p>
              <p className="w-[202px] text-[14px] font-medium">
                University of Abuja Teaching Hospital
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <p className="text-[30px] font-bold">Address</p>
              <p className="w-[202px] text-[14px] font-medium text-[#60737D]">
                No 11, Huxiberkistan St, Plot 1023, Garzon Estate. Abuja,
                NIgeria.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-stretch gap-4 px-14">
          <div className="w-full flex justify-between border-b">
            <div>
              <p className="text-[18px] font-semibold text-[#040C21]">
                Description
              </p>
            </div>
            <div>
              <p className="text-[18px] font-semibold text-[#040C21]">Amount</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center py-1 border-b ">
            <p className="text-[16px] font-normal text-[#6A6A6B]">
              Monthly Charge
            </p>
            <p className="text-[16px] font-normal text-[#6A6A6B]">56,780.00</p>
          </div>
          <div className="w-full flex justify-between py-1 border-b">
            <p className="text-[16px] font-normal text-[#6A6A6B]">
              Paystack fee (2.5%)
            </p>
            <p className="text-[16px] font-normal text-[#6A6A6B]">1,419.00</p>
          </div>
          <div className="flex flex-col items-end font-bold text-black text-[16px] my-[80px]">
            <div className="flex items-center gap-10">
              <p>Sub Total(s)</p>
              <p>N 56,780</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Total(N)</p>
              <p>N 56,780</p>
            </div>
          </div>
          <div className="flex justify-end gap-5 border-b-2 mb-10 pb-5">
            <Button variant={"outline"}>Print</Button>
            <Button variant={"outline"}>Download</Button>
          </div>
        </div>
        <p className="text-center">
          <Link to={"#"}>info@reaps.org</Link>
        </p>
      </div>
    </div>
  );
}
