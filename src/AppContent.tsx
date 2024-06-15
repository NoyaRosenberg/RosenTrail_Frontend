import React from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar";

interface AppContentProps {
  isLoggedIn: boolean;
}

const AppContent: React.FC<AppContentProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/signin", "/register"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar isUserLoggedIn={isLoggedIn} />
      )}
      <AppRoutes />
    </>
  );
};

export default AppContent;
