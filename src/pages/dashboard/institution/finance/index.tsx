import PageTitle from "@/components/custom/PageTitle";
import { TransitionElement } from "@/lib/transitions";
import { Link } from "react-router-dom";
import RevenueBar from '@/assets/short-mockup-bar-chart.svg';
import PaymentsBar from '@/assets/blue-mockup-bar-chart.svg';
import ArrowUpRight from '@/assets/arrow-up-right-01.svg';
import FinanceCards from "./cards";
import MonthlyPaymentsChart, { RevenueCategoryChart } from "./charts/finance-charts";
import {  MoreHorizontalIcon } from "lucide-react";
import InstitutionPayments from "./finance-payments-section";


const finance_card_info = [
    {
        title: 'Total Revenue',
        value: '₦2,000,000',
        bgColor: '#FDF8F1',
        percent: '+15%',
        percentColor: '#1DD75B',
        image: RevenueBar
    },
    {
        title: 'Number of Payments',
        value: '159',
        bgColor: '#F1F7FE',
        percent: '+32%',
        percentColor: '#1DD75B',
        image: PaymentsBar
    },
    // {
    //     title: 'Avg. Payment Value',
    //     value: '₦50,000',
    //     bgColor: '#FFEDF7',
    //     percent: '-54%',
    //     percentColor: '#DE3B40',
    //     image: AvgPaymentsBar
    // },


]
export default function InstitutionFinanceOverview() {
    return (
        <TransitionElement>
            <div className="flex flex-col gap-[1.25rem]">
                <div className="flex justify-between items-center">
                    <PageTitle title="Finance Overview" actions={null} />
                    <Link to='/institution/finance-overview/invoice' className="flex gap-1 items-center border-b border-b-[#192C8A] text-[#192C8A]">
                        <span>Invoices</span>
                        <span><img src={ArrowUpRight} alt="Arrow up right icon"/></span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {finance_card_info.map((finance_info) => (
                        <FinanceCards 
                            title={finance_info.title} 
                            value={finance_info.value}
                            bgColor={finance_info.bgColor}
                            image={finance_info.image}
                            percent={finance_info.percent}
                            percentColor={finance_info.percentColor}/>
                    ))}
                </div>
                <div className="flex w-full gap-3 items-center justify-center ">
                    <div className="w-[60%] rounded-[.875rem] border border-[#8686871A] p-4 mb-4">
                        <div className="py-4 flex items-center justify-between">
                            <p className="font-semibold text-sm">Monthly Payment</p>
                            <div className="flex gap-2 items-center">
                                <p className="flex gap-1 items-center">
                                    <span className="w-3 h-3 rounded-full bg-[#FFD13A]"></span>
                                    <span className="text-xs">Earning</span>
                                 
                                </p>
                                <button>
                                    <MoreHorizontalIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                        <MonthlyPaymentsChart />
                    </div>
                    <div className="w-[45%] rounded-[.875rem] border border-[#8686871A] p-4 mb-4">
                        <div className="py-4 flex items-center justify-between">
                            <p className="font-semibold text-sm">Revenue By Category</p>
                            <button><MoreHorizontalIcon className="w-6 h-6" /></button>
                        </div>
                        <div className="w-full">
                            <RevenueCategoryChart />
                        </div>
                    </div>
                   
                </div>
                <InstitutionPayments />
            </div>
        </TransitionElement>
    )
}