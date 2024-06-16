import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ActivitiesPage from "../components/ActivitiesPage/ActivitiesPage";
import CreateTripPage from "../components/CreateTripPage/CreateTripPage";
import MainPage from "../components/MainPage";
import SignInPage from "../components/SignInPage/SignInPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import TripsPage from "../components/TripsPage/TripsPage";
import { CircularProgress } from "@mui/material";
import TripPage from "../components/TripPage/TripPage";

const AppRoutes: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();

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
      <Route path="/tripDetails" element={<TripPage />} />
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
      <Route path="*" element={<Navigate to={isLoggedIn ? "/trips" : "/"} />} />
    </Routes>
  );
};

export default AppRoutes;
