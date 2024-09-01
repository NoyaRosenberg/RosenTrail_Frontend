import React, {useEffect, useState} from "react";
import activityService, {Activity} from "../../services/activity.service.ts";
import {Trip} from "../../services/trip.service.ts";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import {
    FormContainer,
    Title,
    Subtitle,
    StyledForm,
    StyledTextField,
    ParticipantsContainer, SaveButton
} from "../../styles/CreateActivityForm.styles.ts";
import {Coordinates} from "../../services/google-maps.service";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
    activityToEdit?: Activity | null;
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
                                                                   activityToEdit = null,
                                                               }) => {
    const [formData, setFormData] = useState({
        date: trip.startDate ?? new Date(),
        location: location ?? "",
        startTime: "",
        endTime: "",
        categories: categories ?? "",
        description: description ?? "",
        participants: activityToEdit?.participants ?? 1,
        cost: cost ?? 0,
        tripId: trip._id ?? "",
        name: location ?? "",
        activityId: activityToEdit?._id ?? "",
        imageUrl: imageUrl ?? "",
        coordinates: coordinates,
        rating: rating,
        priceLevel: priceLevel
    });

    const navigate = useNavigate(); // Hook to navigate

    useEffect(() => {
        if (activityToEdit) {
            // If an activity is provided, populate the form with its data
            setFormData({
                ...activityToEdit,
                activityId: activityToEdit?._id ?? "",
                participants: formData.participants ?? 0,
                categories: activityToEdit?.categories ?? "",
                imageUrl: activityToEdit?.imageUrl ?? "",
                description: activityToEdit?.description ?? "",
                cost: activityToEdit?.cost ?? 0,
                priceLevel: activityToEdit?.priceLevel,
                rating: activityToEdit?.rating,
                coordinates: activityToEdit?.coordinates
            });
        }
    }, [activityToEdit, trip._id]);

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
            if (activityToEdit) {
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormContainer>
                <Title>{activityToEdit ? "Edit" : "Create"} Your Activity</Title>
                <Subtitle>You can {activityToEdit ? "edit" : "create"} your activity plans here</Subtitle>
                <StyledForm onSubmit={handleSubmit}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            label="Date"
                            value={dayjs(formData.date)}
                            minDate={dayjs(new Date(trip.startDate || new Date()))}
                            maxDate={dayjs(new Date(trip.endDate || new Date()))}
                            onChange={(date) => handleDateChange(date!.toDate(), "date")}
                        />
                    </DemoContainer>
                    <StyledTextField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                            "& .MuiInputBase-root": {
                                width: 255
                            },
                        }}
                    />
                    <StyledTextField
                        label="Start Hour"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        sx={{
                            "& .MuiInputBase-root": {
                                width: 255
                            },
                        }}
                    />
                    <StyledTextField
                        label="End Hour"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        sx={{
                            "& .MuiInputBase-root": {
                                width: 255
                            },
                        }}
                    />
                    <StyledTextField
                        label="Activity Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        sx={{
                            "& .MuiInputBase-root": {
                                width: 255
                            },
                        }}
                    />
                    <ParticipantsContainer>
                        <StyledTextField
                            label="Number of Participants"
                            name="participants"
                            type="number"
                            value={formData.participants}
                            onChange={handleParticipantsChange}
                            InputProps={{inputProps: {min: 1}}}
                            sx={{
                                "& .MuiInputBase-root": {
                                    width: 255
                                },
                            }}
                        />
                    </ParticipantsContainer>
                    <StyledTextField
                        label="Price"
                        name="cost"
                        type="number"
                        value={formData.cost}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                            "& .MuiInputBase-root": {
                                width: 255
                            },
                        }}
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
