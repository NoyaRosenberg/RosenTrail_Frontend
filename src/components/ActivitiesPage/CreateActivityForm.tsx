import React, { useState } from 'react';
import activityService, { Activity } from '../../services/activity.service';
import { Trip } from '../../services/trip.service';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type CreateActivityFormProps = {
    location: string,
    description: string,
    trip: Trip;
    onClose: () => void;
};
const CreateActivityForm: React.FC<CreateActivityFormProps> = ({ location, description, trip, onClose }) => {
    const [formData, setFormData] = useState({
        date: new Date(),
        location: location,
        startTime: '',
        endTime: '',
        description: description,
        participants: 1,
        cost: 0,
        tripId: trip._id ?? '',
        name: location
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date: Date | null, name: string) => {
        setFormData((prevTrip) => ({
            ...prevTrip,
            [name]: date,
        }));
    };

    const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, participants: parseInt(e.target.value) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await activityService.addActivity(formData);
            toast.success("activity created successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to create activity");
            console.error("Failed to save trip:", error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2>Edit Your Activity</h2>
                <p>You can edit your activity plans here</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                    {/* <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={formData.date.toISOString().slice(0, 10)} onChange={handleChange} /> */}

                    <DatePicker
                        label="Date"
                        value={formData.date}
                        onChange={(date) => handleDateChange(date as Date | null, "date")}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />

                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />

                    <label htmlFor="startTime">Start Hour</label>
                    <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} />

                    <label htmlFor="endTime">End Hour</label>
                    <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />

                    <label htmlFor="description">Activity Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>

                    <label htmlFor="participants">Number of Participants</label>
                    <input type="number" id="participants" name="participants" value={formData.participants} onChange={handleParticipantsChange} min="1" />

                    <label htmlFor="cost">Price</label>
                    <input type="text" id="cost" name="cost" value={formData.cost} onChange={handleChange} />

                    <button type="submit" style={{ marginTop: '20px', backgroundColor: '#64c963', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Save changes</button>
                </form>
                <footer style={{ marginTop: '20px' }}>
                    <p>Need help? Contact us at:</p>
                    <a href="mailto:Wonderplan@gmail.com">Wonderplan@gmail.com</a>
                </footer>
            </div>
        </LocalizationProvider>
    );
};

export default CreateActivityForm;