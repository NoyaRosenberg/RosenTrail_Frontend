import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Stack } from "@mui/material";
import theme from "./theme";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import AppContent from "./AppContent";
import { TripsProvider } from "./contexts/TripProvider";
import { ActivityProvider } from "./contexts/ActivityProvider";
import React from "react";

function App() {
  return (
    <AuthProvider>
      <TripsProvider>
        <ActivityProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <AppWrapper />
            </Router>
          </ThemeProvider>
        </ActivityProvider>
      </TripsProvider>
    </AuthProvider>
  );
}

const AppWrapper: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack className="main-container">
      <AppContent isLoggedIn={isLoggedIn} />
    </Stack>
  );
};

export default App;
