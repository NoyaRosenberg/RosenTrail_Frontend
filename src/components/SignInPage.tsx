import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignInPage.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login (e.g., save token, redirect)
        console.log('Login successful:', data);
        navigate('/'); // Redirect to main page or user dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="sign-in-page">
      <nav className="navbar">
        <h1 className="nav-title">Wonderplan</h1>
        <ul className="nav-links">
          <li><a href="/community" className="nav-link gray-link">Community trips</a></li>
          <li><a href="/signin" className="nav-link">Login</a></li>
          <li className="separator">|</li>
          <li><a href="/register" className="nav-link">Sign up</a></li>
        </ul>
      </nav>
      <div className="sign-in-content">
        <div className="left-container">
          <img src="/image1.png" alt="Background" className="background-img" />
          <div className="overlay">
            <h2>Continue Your Journey</h2>
          </div>
        </div>
        <div className="right-container">
          <div className="form-container">
            <h2>Log in</h2>
            <p>Log in and continue your wonderful trip plans</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Log in!</button>
            </form>
            {error && <p className="error">{error}</p>}
            <button className="google-login">Log in with Google</button>
            <p>Need help? Contact us at:</p>
            <p>Wonderplan@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
