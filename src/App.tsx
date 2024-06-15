import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Stack } from "@mui/material";
import theme from "./theme";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import AppContent from "./AppContent";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppWrapper />
        </Router>
      </ThemeProvider>
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
