import PageTitle from "@/components/custom/PageTitle";
import { TransitionElement } from "@/lib/transitions";
import { Link } from "react-router-dom";
import RevenueBar from '@/assets/short-mockup-bar-chart.svg';
import PaymentsBar from '@/assets/blue-mockup-bar-chart.svg';
import ArrowUpRight from '@/assets/arrow-up-right-01.svg';
import FinanceCards from "./cards";
import { MonthlyPaymentsChart, PaymentByGenderChart, RevenueCategoryChart, RevenueComparisonChart } from "./charts";
import InstitutionPayments from "./payments";
import { ShareExportPopover } from "./overlays/share-export";
import DateFilter from "./overlays/filter-by-date";


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
               <section className="flex flex-col gap-[1.25rem]">
                    <div className="w-full flex gap-2 items-center justify-end">
                        <DateFilter />
                        <ShareExportPopover />
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
               </section>

                

                <section className="flex w-full gap-3 items-center justify-center ">
                    <div className="w-[60%] rounded-[.875rem] border border-[#8686871A] p-4 mb-4 shadow-lg">
                        <div className="py-4 flex items-center justify-between">
                            <p className="font-semibold text-sm">Monthly Payment</p>
                            <div className="flex gap-2 items-center justify-center">
                                <p className="flex gap-1 items-center">
                                    <span className="w-3 h-3 rounded-full bg-[#FFD13A]"></span>
                                    <span className="text-xs">Earning</span>
                                 
                                </p>
                                <ShareExportPopover />
                            </div>
                        </div>
                        <MonthlyPaymentsChart />
                    </div>
                    <div className="w-[45%] rounded-[.875rem] border border-[#8686871A] p-4 mb-4 shadow-lg">
                        <div className="py-4 flex items-center justify-between">
                            <p className="font-semibold text-sm">Revenue By Category</p>
                            <ShareExportPopover />
                        </div>
                        <div className="w-full">
                            <RevenueCategoryChart />
                        </div>
                    </div>
                </section>

                <section className="flex w-full h-full gap-3 items-center justify-center ">
                    <div className="h-full w-[60%] rounded-[.875rem] border border-[#8686871A] p-4 shadow-lg">
                        <div className="py-4 flex items-center justify-between">
                            <p className="font-semibold text-[1.375rem]">Revenue Comparison</p>
                            <ShareExportPopover />
                        </div>
                        <RevenueComparisonChart />
                        <p className="flex gap-3 items-center text-[#333] text-xs mt-4 justify-center w-full">
                            <span className="flex gap-2 items-center">
                                <span className="w-2 h-2 rounded-full bg-[#192C8A]"></span>
                                <span>This Year</span>
                            </span>
                            <span className="flex gap-2 items-center ">
                                <span className="w-2 h-2 rounded-full bg-[#D1D5DB]"></span>
                                <span>Last Year</span>
                            </span>
                        </p>
                    </div>

                    <div className="w-[45%] rounded-[.875rem] border border-[#8686871A] p-4 mb-4 shadow-lg">
                        <div className="py-4 flex items-center justify-between">
                            <p className="font-semibold text-[1.375rem]">Payment by Gender</p>
                        </div>
                        <PaymentByGenderChart />
                      
                    </div>
                </section>

                <section>
                    <InstitutionPayments />
                </section>
                
            </div>
        </TransitionElement>
    )
}