import { Link } from 'react-router-dom';
import '../styles/MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <nav className="navbar">
        <h1 className="nav-title">Wonderplan</h1>
        <ul className="nav-links">
          <li><Link to="/community" className="nav-link gray-link">Community trips</Link></li>
          <li><Link to="/signin" className="nav-link">Login</Link></li>
          <li className="separator">|</li>
          <li><Link to="/register" className="nav-link">Sign up</Link></li>
          <li><Link to="/createTrip" className="nav-link">Create Trip</Link></li>
          <li><Link to="/editTrip" className="nav-link">Edit Trip</Link></li>

        </ul>
      </nav>
      <div className="background-container">
        <img src="/image1.png" alt="Background" className="background-img" />
        <div className="overlay">
          <h2 className="welcome-text">WELCOME</h2>
          <h1 className="main-title">THIS IS NATURE</h1>
          <p className="description">All you need to start your wonderful vacation</p>
          <p className="sub-description">Plan | Cherish | Share</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
