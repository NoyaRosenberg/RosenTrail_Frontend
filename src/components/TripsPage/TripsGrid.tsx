import { Grid } from "@mui/material";
import PlaceCard from "../PlaceCard";
import { Trip } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";

export interface TripsGrisProps {
  trips: Trip[];
}

const TripsGrid = ({ trips }: TripsGrisProps) => {
  const navigate = useNavigate();

  const createNewTripClick = () => {
    navigate("/createTrip");
  };

  const showTripDetails = () => {
    // navigate to trip details page
  };

  return (
    <Grid
      container
      spacing={2}
      display="flex"
      justifyContent={trips.length == 0 ? "center" : ""}
    >
      <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
        <PlaceCard
          name="New Trip"
          description="Create a new wonderful plan!"
          image="/public/createTripBackground.jpeg"
          isNew={true}
          onCardClick={createNewTripClick}
        />
      </Grid>

      {trips.map((trip, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
          <PlaceCard
            name={trip.destinations.join(", ")}
            description={trip.description}
            image={trip.imgUrl}
            onCardClick={showTripDetails}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TripsGrid;
