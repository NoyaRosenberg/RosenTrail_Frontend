import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ActivitiesPage from "../components/ActivitiesPage/ActivitiesPage";
import CreateTripPage from "../components/CreateTripPage/CreateTripPage";
import SignInPage from "../components/SignInPage/SignInPage";
import SignUpPage from "../components/SignUpPage/SignUpPage";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import { CircularProgress } from "@mui/material";
import SchedulePage from "../components/SchedulePage/SchedulePage";
import MainPage from "../components/MainPage/MainPage";
import BudgetPage from "../components/BudgetPage/BudgetPage";
import TripsPage from "../components/TripsPage/TripsPage";
import { useTrips } from "../contexts/TripProvider";

const AppRoutes: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();
  const { communityTrips, fetchCommunityTrips, userTrips, fetchUserTrips } =
    useTrips();
  const location = useLocation();

  if (loading) {
    return <CircularProgress />;
  }

  if (location.pathname === "/" && isLoggedIn) {
    return <Navigate to="/trips" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route
        path="/communityTrips"
        element={
          <TripsPage
            trips={communityTrips}
            fetchTrips={fetchCommunityTrips}
            isCommunityTrips={true}
            title="Community Trips"
            subTitle="Search for a trip and get ideas to plan your next journey"
          />
        }
      />
      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <TripsPage
              trips={userTrips}
              fetchTrips={fetchUserTrips}
              isCommunityTrips={false}
              title="My Wonderful Trips"
              subTitle="Create a new trip or enter your former trip to edit, 
              publish or print pictures from your wonderful trips"
            />
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
      <Route path="/schedule" element={<SchedulePage />} />
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
            <BudgetPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/trips" : "/"} />} />
    </Routes>
  );
};

export default AppRoutes;
