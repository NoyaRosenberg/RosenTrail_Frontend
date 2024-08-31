import { useState, useEffect } from "react";
import { Box, CircularProgress, Container, Stack, Typography } from "@mui/material";
import SearchBar from "../Shared/SearchBar";
import TripsGrid from "./TripsGrid";
import { useTrips } from "../../contexts/TripProvider";
import { Trip } from "../../services/trip.service";
import CardsSkeleton from "../Shared/CardsSkeleton";

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
        width: "68%",
      }}
    >
      <Stack spacing={2} alignItems="center" width="100%">
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          {subTitle}
        </Typography>
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
