import React from 'react';
import { LineChart } from "@mui/x-charts";

interface DailyBudgetChartProps {
  numberOfDays: number;
  series: { data: number[], label: string }[];
}

const DailyBudgetChart: React.FC<DailyBudgetChartProps> = ({ numberOfDays, series }) => {
  const daysLabels = Array.from({ length: numberOfDays }, (_, index) => `Day ${index + 1}`);

  return (
    <LineChart
      sx={{
        '& .MuiLineElement-root': {
          strokeWidth: 7,
        },
      }}
      width={500}
      height={300}
      series={series.map((item, index) => ({
        ...item,
        area: true,
        showMark: false,
        color: ['dodgerblue', 'tomato', 'gold', 'limegreen'][index % 4],
      }))}
      xAxis={[{ scaleType: 'point', data: daysLabels }]}
    />
  );
};

export default DailyBudgetChart;
