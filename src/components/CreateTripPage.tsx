import { useState } from 'react';
import '../styles/CreateTrip.css';

const CreateTripPage = () => {
  const [trip, setTrip] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    city: '',
    participants: ''
  });

  const handleChange = (e: { target: { name: string; value: unknown; }; }) => {
    const { name, value } = e.target;
    setTrip({
      ...trip,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log('Trip details saved:', trip);
  };

  return (
    <div className="app-container">
      <div className="image-container"></div>
      <div className="form-container">
        <h2>Edit Your Trip</h2>
        <p>You can edit your trip plans here</p>
        <div className="form">
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={trip.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            placeholder="End Date"
            value={trip.endDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={trip.destination}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={trip.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="participants"
            placeholder="participants"
            value={trip.participants}
            onChange={handleChange}
          />
          
          <button onClick={handleSave}>Save changes</button>
        </div>
        <p className="contact">Need help? Contact us at: <a href="mailto:Wonderplan@gmail.com">Wonderplan@gmail.com</a></p>
      </div>
    </div>
  );
};

export default CreateTripPage;