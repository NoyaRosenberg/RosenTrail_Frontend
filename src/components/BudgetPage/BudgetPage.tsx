import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/BudgetPage.css';
import DailyBudgetChart from './DailyBudgetChart';
import DailyBudgetGauges from './DailyBudgetGauges';

const COLORS = ['#dcc7c1', '#8F48CC', '#FCB232', '#5ECFCF'];
const CURRENCY_OPTIONS = ['$'];

interface Trip {
  _id: string;
  startDate: Date;
  endDate: Date;
}

interface DailyBudget {
  name: string;
  value: number;
}

type ExpensesPerCategory = { data: number[], label: string }[];

const BudgetPage: React.FC = () => {
  const location = useLocation();
  const { trip } = location.state as { trip: Trip };
  const [tripDurationInDays, setTripDurationInDays] = useState(0);
  const [expensesPerCategory, setExpensesPerCategory] = useState<ExpensesPerCategory>([]);
  const [dailyBudget, setDailyBudget] = useState<DailyBudget[]>([]);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [currency, setCurrency] = useState<string>(CURRENCY_OPTIONS[0]);
  const [dailyBudgetInput, setDailyBudgetInput] = useState<number>(450);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/activities?tripId=${trip._id}`);
        const activities = response.data;

        if (!activities || !Array.isArray(activities)) {
          console.error('Invalid activities data:', activities);
          return;
        }

        calculateDailyBudget(activities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    const calculateDailyBudget = (activities: any[]) => {
      const budgetMap: { [key: string]: number } = {};
      let totalCost = 0;

      activities.forEach(activity => {
        const date = new Date(activity.date).toDateString();
        if (!budgetMap[date]) {
          budgetMap[date] = 0;
        }

        if (activity.participantsId.length > 0) {
          budgetMap[date] += activity.cost * activity.participantsId.length;
          totalCost += activity.cost * activity.participantsId.length;
        } else {
          budgetMap[date] += activity.cost;
          totalCost += activity.cost;
        }
      });

      setTripDurationInDays(Object.keys(budgetMap).length);
      setExpensesPerCategory([{ data: Object.values(budgetMap), label: 'Expenses' }]);
      const dailyBudgetData = Object.keys(budgetMap).map((date, index) => ({
        name: `Day ${index + 1}`,
        value: budgetMap[date],
      }));

      setDailyBudget(dailyBudgetData);
      setTotalBudget(totalCost);
    };

    fetchActivities();
  }, [trip._id]);

  return (
    <Container maxWidth="lg" className="budget-container">
      <Box>
        <Typography variant="h4" gutterBottom>
          Daily Budget
        </Typography>

        <Typography variant="h6">Total {totalBudget} {currency}</Typography>

        <Box display="flex" gap="16px" mb={2}>
          <TextField
            select
            variant="outlined"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            size="small"
            className="currency-select"
          >
            {CURRENCY_OPTIONS.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Daily Budget"
            type="number"
            value={dailyBudgetInput}
            onChange={(e) => setDailyBudgetInput(Number(e.target.value))}
            size="small"
            className="budget-input"
          />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <DailyBudgetGauges baseDailyBudget={dailyBudgetInput} dailyBudgets={dailyBudget} />
          </Grid>
          <Grid item xs={12}>
            <DailyBudgetChart numberOfDays={tripDurationInDays} series={expensesPerCategory} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BudgetPage;
