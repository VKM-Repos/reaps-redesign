export const MonthlyPaymentTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { earning } = payload[0].payload;
      const { valueA } = earning || {};
  
      return (
        <div className="px-[.625rem] py-1 rounded-lg" style={{ backgroundColor: '#1F2937', border: '1px solid #ccc' }}>
          <p className="text-sm text-white">Earning: {valueA >= 1000 ? `${valueA / 1000}k` : valueA}</p>
        </div>
      );
    }
    return null;
  };


  export const RevenueTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { revenue } = payload[0].payload;
  
      return (
        <div className="px-[.625rem] py-1 rounded-lg" style={{ backgroundColor: '#192C8A', border: '1px solid #ccc' }}>
          <p className="text-sm text-white">Revenue: {revenue >= 1000 ? `${revenue / 1000}k` : revenue}</p>
        </div>
      );
    }
    return null;
  };