import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignInPage from './components/SignInPage';
import './App.css';
import SignUpPage from './components/SignUpPage';
import CreateTripPage from './components/CreateTripPage';
import ActivitiesPage from './components/ActivitiesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/createTrip" element={<CreateTripPage />} />
          <Route path="/editTrip" element={<ActivitiesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
