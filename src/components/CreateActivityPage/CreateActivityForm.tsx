import React, {useEffect, useState} from "react";
import activityService, {Activity} from "../../services/activity.service.ts";
import {Trip} from "../../services/trip.service.ts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useNavigate} from "react-router-dom";
import {
    FormContainer,
    Title,
    Subtitle,
    StyledForm,
    StyledTextField,
    ParticipantsContainer,
    SaveButton,
} from "../../styles/CreateActivityForm.styles.ts";
import {Coordinates} from "../../services/google-maps.service";

type CreateActivityFormProps = {
    location?: string;
    description?: string;
    trip: Trip;
    cost?: number;
    categories?: string[];
    coordinates?: Coordinates;
    rating?: number;
    priceLevel?: number;
    imageUrl?: string;
    onClose: () => void;
    activity?: Activity | null;
};

const CreateActivityForm: React.FC<CreateActivityFormProps> = ({
                                                                   location,
                                                                   description,
                                                                   cost,
                                                                   trip,
                                                                   categories,
                                                                   coordinates,
                                                                   rating,
                                                                   priceLevel,
                                                                   imageUrl,
                                                                   onClose,
                                                                   activity = null,
                                                               }) => {
    const [formData, setFormData] = useState({
        date: trip.startDate ?? new Date(),
        location: location ?? "",
        startTime: "",
        endTime: "",
        categories: categories ?? "",
        description: description ?? "",
        participants: activity?.participants ?? 1,
        cost: cost ?? 0,
        tripId: trip._id ?? "",
        name: location ?? "",
        activityId: activity?._id ?? "",
        imageUrl: imageUrl ?? "",
        coordinates: coordinates,
        rating: rating,
        priceLevel: priceLevel
    });

    const navigate = useNavigate(); // Hook to navigate

    useEffect(() => {
        if (activity) {
            // If an activity is provided, populate the form with its data
            setFormData({
                ...activity,
                activityId: activity?._id ?? "",
                participants: formData.participants ?? 0,
                categories: activity?.categories ?? "",
                imageUrl: activity?.imageUrl ?? "",
                description: activity?.description ?? "",
                cost: activity?.cost ?? 0,
                priceLevel: activity?.priceLevel,
                rating: activity?.rating,
                coordinates: activity?.coordinates
            });
        }
    }, [activity, trip._id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleDateChange = (date: Date | null, name: string) => {
        setFormData((prevTrip) => ({
            ...prevTrip,
            [name]: date,
        }));
    };

    const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, participants: parseInt(e.target.value)});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (activity) {
                // If activity exists, update it
                await activityService.updateActivity(formData);
                toast.success("Activity updated successfully");
            } else {
                // If no activity, create a new one
                await activityService.addActivity(formData);
                toast.success("Activity created successfully");
            }

            onClose();
            navigate("/schedule", {state: {trip, showActions: true}}); // Pass state
        } catch (error) {
            toast.error("Failed to create activity");
            console.error("Failed to save trip:", error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormContainer>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{position: "absolute", right: "10px", top: "10px"}}
                >
                    <CloseIcon/>
                </IconButton>
                <Title>{activity ? "Edit" : "Create"} Your Activity</Title>
                <Subtitle>You can edit your activity plans here</Subtitle>
                <StyledForm onSubmit={handleSubmit}>
                    <DatePicker
                        label="Date"
                        value={formData.date}
                        minDate={new Date(trip.startDate || new Date())}
                        maxDate={new Date(trip.endDate || new Date())}
                        onChange={(date) => handleDateChange(date, "date")}
                        renderInput={(params) => <StyledTextField {...params} fullWidth/>}
                    />
                    <StyledTextField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                    />
                    <StyledTextField
                        label="Start Hour"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                    />
                    <StyledTextField
                        label="End Hour"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                    />
                    <StyledTextField
                        label="Activity Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <ParticipantsContainer>
                        <StyledTextField
                            label="Number of Participants"
                            name="participants"
                            type="number"
                            value={formData.participants}
                            onChange={handleParticipantsChange}
                            InputProps={{inputProps: {min: 1}}}
                        />
                    </ParticipantsContainer>
                    <StyledTextField
                        label="Price"
                        name="cost"
                        type="number"
                        value={formData.cost}
                        onChange={handleChange}
                        fullWidth
                    />
                    <SaveButton type="submit" variant="contained" fullWidth>
                        Save changes
                    </SaveButton>
                </StyledForm>
            </FormContainer>
            <ToastContainer/>
        </LocalizationProvider>
    );
};

export default CreateActivityForm;
