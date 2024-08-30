import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Stack } from "@mui/material";
import theme from "./theme";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import AppContent from "./AppContent";
import { TripsProvider } from "./contexts/TripProvider";
import { ActivityProvider } from "./contexts/ActivityProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import './index.css'

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
      <ToastContainer />
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
