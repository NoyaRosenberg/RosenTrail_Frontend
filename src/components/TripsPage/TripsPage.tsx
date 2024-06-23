import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import SearchBar from "../SearchBar";
import TripsGrid from "./TripsGrid";
import { useTrips } from "../../contexts/TripProvider";
import { Trip } from "../../services/trip.service";
import { useState, useEffect } from "react";
import React from "react";

const TripsPage = () => {
  const { trips, loading, error } = useTrips();
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);

  useEffect(() => {
    setFilteredTrips(trips);
  }, [trips]);

  const onTripSearch = (searchValue: string) => {
    const newFilteredTrips = trips.filter(trip =>
      trip.destinations.some(destination =>
        destination.toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    setFilteredTrips(newFilteredTrips);
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <CircularProgress/>
      </Container>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        paddingTop: "14px",
        paddingBottom: "20px",
        width: "68%",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" gutterBottom>
          My Wonderful Trips
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          Create a new trip or enter your former trip to edit, publish or print
          pictures from you wonderful trips
        </Typography>
        <Box width="100%">
          <SearchBar placeholder="search a trip..." onSearch={onTripSearch}/>
        </Box>
      </Stack>
      <Box width="100%">
        <TripsGrid trips={filteredTrips} />
      </Box>
    </Container>
  );
};

export default TripsPage;
