import React from "react";
import {
  CircularProgress,
  Box,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";

interface DailyBudgetItem {
  day: string;
  amount: number;
}

interface DailyBudgetProps {
  days: DailyBudgetItem[];
  totalBudget: number;
  setTotalBudget: (budget: number) => void;
}

const DailyBudget: React.FC<DailyBudgetProps> = ({
  days,
  totalBudget,
  setTotalBudget,
}) => {
  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalBudget(Number(event.target.value));
  };

  return (
    <Box className="daily-budget">
      <Box className="budget-header">
        <Typography variant="h6" className="budget-title">
          Daily Budget
        </Typography>
        <TextField
          type="number"
          value={totalBudget}
          onChange={handleBudgetChange}
          className="budget-input"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>
      <Box className="daily-budget-container">
        {days.map((dayItem, index) => {
          const percentage = Math.round((dayItem.amount / totalBudget) * 100);
          const color =
            index === 0
              ? "#d15e9d"
              : index === 1
              ? "#6544d6"
              : index === 2
              ? "#f1b4b0"
              : index === 3
              ? "#d15e9d"
              : "#5485e7";
          return (
            <Box key={index} className="daily-budget-item">
              <Box className="daily-budget-circle">
                <CircularProgress
                  variant="determinate"
                  value={percentage}
                  size={80}
                  thickness={4}
                  sx={{ color }}
                />
                <Typography
                  variant="caption"
                  className="daily-budget-percentage"
                >
                  {`${percentage}%`}
                </Typography>
              </Box>
              <Typography className="daily-budget-day">{`Day ${
                index + 1
              }`}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default DailyBudget;
