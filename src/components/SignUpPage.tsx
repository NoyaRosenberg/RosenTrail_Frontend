import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password, imgUrl: '' }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful registration (e.g., redirect to login)
        console.log('Registration successful:', data);
        navigate('/signin'); // Redirect to sign-in page
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <nav className="navbar">
        <h1 className="nav-title">Wonderplan</h1>
        <ul className="nav-links">
          <li><a href="/community" className="nav-link gray-link">Community trips</a></li>
          <li><a href="/signin" className="nav-link">Login</a></li>
          <li className="separator">|</li>
          <li><a href="/register" className="nav-link">Sign up</a></li>
        </ul>
      </nav>
      <div className="register-content">
        <div className="left-container">
          <img src="/image1.png" alt="Background" className="background-img" />
          <div className="overlay">
            <h2>Start Your Journey</h2>
          </div>
        </div>
        <div className="right-container">
          <div className="form-container">
            <h2>Sign up</h2>
            <p>Create your account to start planning your trip</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Create username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign up!</button>
            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
