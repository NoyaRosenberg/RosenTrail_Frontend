import { useState, useEffect } from "react";
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import SearchBar from "../Shared/SearchBar";
import TripsGrid from "./TripsGrid";
import { useTrips } from "../../contexts/TripProvider";
import { Trip } from "../../services/trip.service";
import CardsSkeleton from "../Shared/CardsSkeleton";
import React from "react";

export interface TripsPageProps {
  trips: Trip[];
  title: string;
  subTitle: string;
  isCommunityTrips: boolean;
  fetchTrips: () => void;
}

const TripsPage = ({
  trips,
  title,
  subTitle,
  isCommunityTrips,
  fetchTrips,
}: TripsPageProps) => {
  const { loading, error } = useTrips();
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    setFilteredTrips(trips);
  }, [trips]);

  const onTripSearch = (searchValue: string) => {
    const newFilteredTrips = trips.filter((trip) =>
      trip.destinations.some((destination) =>
        destination.toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    setFilteredTrips(newFilteredTrips);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        paddingTop: "50px",
        paddingBottom: "20px",
        width: "68%"
      }}
    >
      <Stack spacing={2} alignItems="center" width="100%">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",  // Position the video absolutely
              left: 0,               // Align it to the left edge of the container
            }}
          >
            <video
              src="/public/video.webm"
              autoPlay
              loop
              muted
              style={{ width: '200px', height: 'auto' }} // Adjust the size as needed
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              {subTitle}
            </Typography>
          </Box>
        </Box>

        <Box width="100%">
          <SearchBar placeholder="Search a trip..." onSearch={onTripSearch} />
        </Box>
      </Stack>
      <Box width="100%">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
            <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
              Loading trips...
            </Typography>
            <CardsSkeleton numInRow={3} />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom variant="h4" color="error">
              Opps!
            </Typography>
            <Typography color="error">
              An error occurred while fetching your trips
            </Typography>
          </Box>
        ) : (
          <TripsGrid trips={filteredTrips} isCommunityTrips={isCommunityTrips} fetchTrips={fetchTrips} />
        )}
      </Box>
    </Container>
  );
};

export default TripsPage;
