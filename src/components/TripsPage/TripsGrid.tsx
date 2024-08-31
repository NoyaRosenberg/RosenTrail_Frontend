import React, { useState } from "react";
import { Grid } from "@mui/material";
import PlaceCard from "../Shared/PlaceCard";
import { Trip } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";
import TripDialog from "./TripDialog";
import reviewService from "../../services/review.service";

export interface TripsGridProps {
  trips: Trip[];
  isCommunityTrips: boolean;
  fetchTrips: () => void;
}

const TripsGrid = ({ trips, isCommunityTrips, fetchTrips }: TripsGridProps) => {
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

  const getAverageRating = async (tripId: string) => {
    try {
      const reviews = await reviewService.getTripReviews(tripId);
      if (reviews.length > 0) {
        const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        return Number(avgRating.toFixed(1));
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      return null;
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent={trips.length === 0 ? "center" : ""}
      >
        {!isCommunityTrips && (
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
            <PlaceCard
              name="New Trip"
              description="Create a new wonderful plan!"
              image="/public/createTripBackground.jpeg"
              isNew={true}
              onCardClick={createNewTripClick}
              isCommunityTrips = {isCommunityTrips}
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
              rating={getAverageRating(trip._id!)}
              isCommunityTrips = {isCommunityTrips}
            />
          </Grid>
        ))}
      </Grid>
      {selectedTrip && (
        <TripDialog
          open={isTripDialogOpen}
          trip={selectedTrip}
          price={selectedTrip?.["activities"]?.reduce(
            (total, activity) => total + (activity.cost || 0),
            0
          )}
          showActions={!isCommunityTrips}
          onClose={onDialogClose}
          onDelete={fetchTrips}
        />
      )}
    </>
  );
};

export default TripsGrid;