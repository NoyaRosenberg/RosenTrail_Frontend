import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ActivitiesPage from "../components/ActivitiesPage/ActivitiesPage";
import CreateTripPage from "../components/CreateTripPage/CreateTripPage";
import SignInPage from "../components/SignInPage/SignInPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import TripsPage from "../components/TripsPage/TripsPage";
import ProfilePage from "../components/ProfilePage/ProfilePage"; 
import { CircularProgress } from "@mui/material";
import SchedulePage from "../components/SchedulePage/SchedulePage";
import MainPage from "../components/MainPage/MainPage";
import BudgetPage from "../components/BudgetPage/BudgetPage";

const AppRoutes: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <CircularProgress />;
  }

  if (location.pathname === '/' && isLoggedIn) {
    return <Navigate to="/trips" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <TripsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createTrip"
        element={
          <ProtectedRoute>
            <CreateTripPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AddActivities"
        element={
          <ProtectedRoute>
            <ActivitiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/budget" 
        element={
          <ProtectedRoute>
            <BudgetPage/>
          </ProtectedRoute>
        } 
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <SchedulePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/trips" : "/"} />} />
    </Routes>
  );
};

export default AppRoutes;
