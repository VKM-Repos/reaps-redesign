import {
    Bar, BarChart, CartesianGrid, Label, Pie, PieChart,
    ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { CurvedBar, SplitCurvedBar } from "./custom-bars";
import { CustomLegend } from "./custom-legends";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import {
    MonthlyPaymentTooltip,
    RevenueTooltip
} from "./tooltips";
import {
    paymentsData,
    paymentsGenderData,
    revenueComparisonData,
    revenueData
} from "./data";
import {
    payment_by_gender_config,
    revenue_comparison_config
} from "./configs";
import { useMemo } from "react";
  



export function MonthlyPaymentsChart() {

    return (
        <ResponsiveContainer width="100%" height={330}>
            <BarChart data={paymentsData}  barCategoryGap="20%" barGap={4} margin={{ top: 10, left: -25, right: 30, bottom: 20 }}>
            <CartesianGrid horizontal={true} vertical={false} strokeDasharray="10 10" />
            <XAxis
                dataKey="month"
                tick={{ fill: '#333', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                dy={20}
            />
            <YAxis
                dataKey="earning.valueA"
                tick={{ fill: '#333', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
            />
            <Tooltip content={<MonthlyPaymentTooltip />} cursor={false}/>
            <Bar
                dataKey="earning.valueA" 
                shape={<SplitCurvedBar />}
                barSize={7.5}
                isAnimationActive={true}
            />
        </BarChart>
      </ResponsiveContainer>
    )
};



export function RevenueCategoryChart() {
    return (
        <ResponsiveContainer width='100%' height={330}>
            <BarChart data={revenueData} barCategoryGap='10%' barGap={1} layout="vertical">
                <CartesianGrid horizontal={false} vertical={true} strokeDasharray="10 10" />
                <XAxis 
                    type="number"
                    tick={{ fill: '#333', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    orientation="bottom"
                    domain={[0, 1500]}
                    ticks={[0, 500, 1000, 1500]}
                />

                <YAxis 
                    type="category"
                    dataKey='category'
                    tick={{ fill: '#333', fontSize: 10, fontWeight: 600, textAnchor: 'start', dx: -55, }}
                    axisLine={false}
                    tickLine={false}
                    orientation="left"
                    dx={-5}
                />
                <Tooltip content={<RevenueTooltip />} cursor={false}/>
                <Bar 
                    dataKey='revenue'
                    shape={<CurvedBar />}
                    barSize={14}
                />
                </BarChart>
        </ResponsiveContainer>
    )
};

export function RevenueComparisonChart() {
    return (
        <ChartContainer config={revenue_comparison_config} className="w-full h-full">
              <BarChart accessibilityLayer 
                data={revenueComparisonData} 
                barCategoryGap={12} 
                barGap={2}
                margin={{ left: -30 }}>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <CartesianGrid horizontal={true} vertical={false} strokeDasharray="4 4" stroke="#E5E7EB"/>
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis 
                    tick={{ fill: '#333', fontSize: 10, textAnchor: 'start', dx: -15, }}
                    axisLine={false}
                    tickLine={false}
                    orientation="left"
                />
                <Bar dataKey='current_year' fill="#192C8A" radius={6} />
                <Bar dataKey='last_year' fill="#D1D5DB" radius={6}/>
            </BarChart>
        </ChartContainer>
    )
}


export function PaymentByGenderChart() {

    const totalSubmissions = useMemo(() => {
        return paymentsGenderData.reduce((acc, curr) => acc + curr.submissions, 0)
      }, [])


    return (
        <div className="pb-4">
            <ChartContainer config={payment_by_gender_config} className="mx-auto aspect-square max-h-[250px]">
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie data={paymentsGenderData} 
                        dataKey='submissions' 
                        nameKey='gender' 
                        innerRadius={80}
                        outerRadius={100}
                        strokeWidth={2}>
                            <Label
                                content={({ viewBox }: any) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return ( 
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy - 20}
                                            fill="#6B7280"
                                            style={{ fontSize: '14px', fontWeight: 600 }}
                                        >
                                            Total
                                        </tspan>

                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 20}
                                            fill="#111827"
                                            style={{ fontSize: '24px', fontWeight: 'bold' }}
                                        >
                                            {totalSubmissions.toLocaleString()}
                                        </tspan>
                                    </text>
                                    )
                                }}}
                            />
                     </Pie>
                </PieChart>
            </ChartContainer>
    
            <CustomLegend data={paymentsGenderData} />

        </div>
    )
}