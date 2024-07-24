import { Grid } from "@mui/material";
import PlaceCard from "../PlaceCard";
import { Trip } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";
import TripDialog from "./TripDialog";
import { useState } from "react";
import React from "react";

export interface TripsGridProps {
  trips: Trip[];
  includeAddTrip: boolean;
  fetchTrips: () => void;
}

const TripsGrid = ({ trips, includeAddTrip, fetchTrips }: TripsGridProps) => {
  const [isTripDialogOpen, setIsTripDialogOpen] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const navigate = useNavigate();

  const createNewTripClick = () => {
    navigate("/createTrip");
  };

  const showTripDetails = (trip: Trip) => {
    setIsTripDialogOpen(true);
    setSelectedTrip(trip);
  };

  const onDialogClose = () => {
    setIsTripDialogOpen(false);
    setSelectedTrip(null);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent={trips.length == 0 ? "center" : ""}
      >
        {includeAddTrip && (
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
            <PlaceCard
              name="New Trip"
              description="Create a new wonderful plan!"
              image="/public/createTripBackground.jpeg"
              isNew={true}
              onCardClick={createNewTripClick}
            />
          </Grid>
        )}

        {trips.map((trip, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <PlaceCard
              name={trip.destinations.join(", ")}
              description={trip.description}
              image={trip.imgUrl}
              onCardClick={() => showTripDetails(trip)}
            />
          </Grid>
        ))}
      </Grid>
      {selectedTrip && (
        <TripDialog
          open={isTripDialogOpen}
          onClose={onDialogClose}
          trip={selectedTrip}
          price={299}
          onDelete={fetchTrips}
        />
      )}
    </>
  );
};

export default TripsGrid;
