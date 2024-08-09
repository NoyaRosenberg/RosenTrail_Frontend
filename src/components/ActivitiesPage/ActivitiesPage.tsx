import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Schedule } from "@mui/icons-material";
import RecommendationsGrid from "./RecommendationsGrid";
// import SearchBar from "../SearchBar";
import ActivityFilters from "./ActivityFilters";
import recommendationService, {
  Category,
  Recommendation,
} from "../../services/recommendation.service";
import CardsSkeleton from "../Skeletons/CardsSkeleton";
import activityService from "../../services/activity.service";
import Map from "./Map";
import "../../styles/ActivitiesPage.css";

const ActivitiesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state.trip;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<Category[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<
    Recommendation[]
  >([]);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const recommendations = await activityService.getActivitiesFromAI(
          ["fun"],
          trip.destinations
        );
        // await recommendationService.getRecommendations();
        setRecommendations(recommendations!);
        setFilteredRecommendations(recommendations!);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getRecommendations();
  }, []);

  // const applyFilters = (filters: Category[], search: string) => {
  //   let newFilteredRecommendations = recommendations;

  //   if (filters.length > 0) {
  //     const filtersId = filters.map((filter) => filter.id);
  //     newFilteredRecommendations = newFilteredRecommendations.filter((rec) =>
  //       filtersId.every((id) => rec.categoriesId.includes(id))
  //     );
  //   }

  //   if (search) {
  //     newFilteredRecommendations = newFilteredRecommendations.filter(
  //       (recommendation) =>
  //         recommendation.name.toLowerCase().includes(search.toLowerCase())
  //     );
  //   }

  //   setFilteredRecommendations(newFilteredRecommendations);
  // };

  // const onActivitySearch = (search: string) => {
  //   setSearchValue(search);
  //   applyFilters(selectedFilters, search);
  // };

  const filterRecommendations = (filters: Category[]) => {
    setSelectedFilters(filters);
    // applyFilters(filters, searchValue);
  };

  const goBackToSchedule = () => {
    navigate("/schedule", { state: { trip, showActions: true } });
  };

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid item xs={7} sx={{ height: '100%' }}>
        <Container sx={{ paddingTop: "20px", paddingBottom: "10px" }}>
          <Stack spacing={5}>
            <Stack spacing={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" sx={{ fontSize: 20, color: "#333" }}>
                  Search For Attractions In New York
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Schedule />}
                  onClick={goBackToSchedule}
                >
                  Trip Schedule
                </Button>
              </Box>
              <Stack spacing={2}>
                {/* <SearchBar
                placeholder="Search for Attractions..."
                onSearch={onActivitySearch}
              /> */}
                <ActivityFilters onFilterSelected={filterRecommendations} />
              </Stack>
            </Stack>
            <Stack spacing={2} sx={{ alignItems: "flex-start", width: "100%" }}>
              <Stack>
                <Typography variant="h3" sx={{ fontSize: 20, color: "#333" }}>
                  Recommendations For Attractions
                </Typography>
                <Typography variant="body1" sx={{ color: "#666" }}>
                  Click an activity to add it to your trip!
                </Typography>
              </Stack>
              {loading ? (
                <CardsSkeleton numInRow={4} />
              ) : error ? (
                <Typography color="error">
                  Failed To Fetch recommendations
                </Typography>
              ) : (
                <Box className="scrollable" sx={{ width: "100%", height: "40vh", overflowY: "auto" }}>
                  <RecommendationsGrid
                    recommendations={filteredRecommendations}
                    trip={trip}
                  />
                </Box>
              )}
            </Stack>
          </Stack>
        </Container>
      </Grid>
      <Grid item xs={5}>
        <Map />
      </Grid>
    </Grid>
  );
};

export default ActivitiesPage;
