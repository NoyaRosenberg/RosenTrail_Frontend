import React from "react";
import { Box, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

interface BudgetItem {
  category: string;
  amount: number;
}

interface BudgetManagementProps {
  budgetData: BudgetItem[];
}

const colors = ["#FF6584", "#00BCD4", "#FF9800", "#4CAF50"];

const BudgetManagement: React.FC<BudgetManagementProps> = ({ budgetData }) => {
  const totalAmount = budgetData.reduce((acc, item) => acc + item.amount, 0);
  const percentageData = budgetData
    .map((item) => ({
      ...item,
      percentage: ((item.amount / totalAmount) * 100).toFixed(2),
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  return (
    <div className="budget-management">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography variant="h6" className="budget-title">
          Budget Management
        </Typography>
        <SettingsIcon className="settings-icon" />
      </Box>
      <hr className="divider" />
      <div className="category">
        <ul className="budget-legend">
          {percentageData.map((item, index) => (
            <li key={index}>
              <span
                className="legend-color"
                style={{ backgroundColor: colors[index] }}
              />
              {item.category}: {item.percentage}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetManagement;
