export const SplitCurvedBar = ({ x, y, width, height, payload}: any) => {

    const total = payload?.earning.valueA + payload?.earning?.valueB;
    const portionA = payload?.earning.valueA/total;

    const gap = 5;
    const availableHeight = height - gap;
  
    const topHeight = availableHeight * (portionA);
    const bottomHeight = availableHeight - topHeight;

    return (
        <g>
           <rect
            x={x}
            y={y}
            width={width}
            height={topHeight}
            fill="#D1D5DB"
            rx={topHeight > 4 ? 4 : 0}
            ry={topHeight > 4 ? 4 : 0}
        />

        <rect
            x={x}
            y={y + topHeight + gap}
            width={width}
            height={bottomHeight}
            fill="#FFD13A"
            rx={2}
            ry={2}
        />
        </g>
    )
}

export const CurvedBar = ({ x, y, width, height }: any) => {
    const radius = 6;
    const adjustedHeight = Math.max(height, radius); 

  return (
    <g>
        <rect
        x={x}
        y={y}
        width={width}
        height={adjustedHeight}
        rx={radius}
        ry={radius}
       fill='#192C8A' />;
    </g>
  )
  };