import React from 'react';
import { Box, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";

const gaugesColors = ['#10439F', '#874CCC', '#C65BCF', '#F27BBD'];

interface DailyBudgetGaugesProps {
  baseDailyBudget: number;
  dailyBudgets: { name: string; value: number }[];
}

const DailyBudgetGauges: React.FC<DailyBudgetGaugesProps> = ({ baseDailyBudget, dailyBudgets }) => {
  return (
    <Box display="flex" flexDirection="row" gap="40px">
      {dailyBudgets.map((dailyBudget, index) => {
        const percentage = Math.round((dailyBudget.value / baseDailyBudget) * 100);
        return (
          <Box display="flex" flexDirection="column" gap="10px" justifyContent="center" alignItems="center" key={index}>
            <Gauge
              cornerRadius="50%"
              width={100}
              height={100}
              value={percentage}
              sx={() => ({
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: gaugesColors[index % 4],
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: '#F6F1E9',
                },
              })}
            />
            <Typography>{dailyBudget.name}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default DailyBudgetGauges;
