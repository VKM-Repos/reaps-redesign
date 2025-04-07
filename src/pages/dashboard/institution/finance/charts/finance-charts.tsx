import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MonthlyPaymentTooltip, RevenueTooltip } from "./finance-chart-tooltips";
import { paymentsData, revenueData } from "./data";
import { CurvedBar, SplitCurvedBar } from "./custom-bars";


export default  function MonthlyPaymentsChart() {
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
  }



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
}