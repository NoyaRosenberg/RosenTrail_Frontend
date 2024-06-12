import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import SignInPage from "./components/SignInPage/SignInPage";
import "./App.css";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import CreateTripPage from "./components/CreateTripPage/CreateTripPage";
import ActivitiesPage from "./components/ActivitiesPage/ActivitiesPage";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/createTrip" element={<CreateTripPage />} />
            <Route path="/AddActivities" element={<ActivitiesPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
