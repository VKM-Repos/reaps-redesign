import { ChartConfig } from "@/components/ui/chart";

export const revenue_comparison_config = {
    current_year: {
        label: 'This year',
        color: '#192C8A'
    },
    last_year: {
        label: 'Last year',
        color: '#D1D5DB'
    }
} satisfies ChartConfig;

export const payment_by_gender_config = {
    female: {
        label: 'Female',
        color: '#DE3B40'
    },
    male: {
        label: 'Male',
        color: '#192C8A'
    }
} satisfies ChartConfig;