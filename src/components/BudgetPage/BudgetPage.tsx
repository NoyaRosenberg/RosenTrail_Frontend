import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BudgetManagement from "./BudgetManagement";
import DailyBudget from "./DailyBudget";
import BudgetPerCategory from "./BudgetPerCategory";
import TopExpensiveAttractions from "./TopExpensiveAttractions";
import activityService, { Activity } from "../../services/activity.service";
import { Trip } from "../../services/trip.service";
import "../../styles/BudgetPage.css";
import DailyBudgetGraph from "./DailyBudgetGraph";

interface BudgetItem {
  category: string;
  amount: number;
}

interface DailyBudgetItem {
  day: string;
  amount: number;
}

interface Attraction {
  name: string;
  cost: number;
}

const BudgetPage = () => {
  const location = useLocation();
  const { trip } = location.state as { trip: Trip };
  const [activities, setActivities] = useState<Activity[]>([]);
  const [budgetData, setBudgetData] = useState<BudgetItem[]>([]);
  const [dailyBudget, setDailyBudget] = useState<DailyBudgetItem[]>([]);
  const [budgetPerCategory, setBudgetPerCategory] = useState<BudgetItem[]>([]);
  const [topExpensiveActivities, setTopExpensiveActivities] = useState<
    Attraction[]
  >([]);
  const [totalBudget, setTotalBudget] = useState<number>(50);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!trip._id) {
          console.log("No tripId found");
          return;
        }

        console.log("Fetching activities for tripId:", trip._id);
        const activities = await activityService.getTripActivities(trip._id);

        if (Array.isArray(activities)) {
          setActivities(activities);
          processBudgetData(activities);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    const processBudgetData = (activities: Activity[]) => {
      const budgetData: BudgetItem[] = [];
      const dailyBudget: DailyBudgetItem[] = [];
      const budgetPerCategory: BudgetItem[] = [];
      const topExpensiveActivities: Attraction[] = [];

      const categoryMap: { [key: string]: number } = {};
      const dayMap: { [key: string]: number } = {};

      activities.forEach((activity) => {
        // Process budget per category
        for (let category of activity.categories.filter(category => category)) {
          categoryMap[category] =
          (categoryMap[category] || 0) + activity.cost;
        }
     

        // Process daily budget
        const activityDate = new Date(activity.date).toDateString();
        dayMap[activityDate] = (dayMap[activityDate] || 0) + activity.cost;

        // Process top expensive activities
        topExpensiveActivities.push({
          name: activity.name,
          cost: activity.cost,
        });
      });

      // Convert maps to arrays
      for (const category in categoryMap) {
        budgetData.push({ category, amount: categoryMap[category] });
      }

      for (const day in dayMap) {
        dailyBudget.push({ day, amount: dayMap[day] });
      }

      // Sort top expensive activities
      topExpensiveActivities.sort((a, b) => b.cost - a.cost);

      setBudgetData(budgetData);
      setDailyBudget(dailyBudget);
      setBudgetPerCategory(budgetData);
      setTopExpensiveActivities(topExpensiveActivities.slice(0, 5)); // Get top 5 expensive activities
    };

    getData();
  }, [trip._id]);

  return (
    <div className="budget-page">
      <div className="budget-content">
        <BudgetManagement budgetData={budgetData} />
        <DailyBudget
          days={dailyBudget}
          totalBudget={totalBudget}
          setTotalBudget={setTotalBudget}
        />
        <TopExpensiveAttractions attractions={topExpensiveActivities} />
        <BudgetPerCategory categories={budgetPerCategory} />
        <DailyBudgetGraph dailyBudget={dailyBudget} />
      </div>
    </div>
  );
};

export default BudgetPage;
