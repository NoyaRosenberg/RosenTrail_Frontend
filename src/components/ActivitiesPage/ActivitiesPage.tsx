import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Schedule } from '@mui/icons-material';
import RecommendationsGrid from "./RecommendationsGrid";
import SearchBar from "../SearchBar";
import ActivityFilters from "./ActivityFilters";
import recommendationService, {
  Category,
  Recommendation,
} from "../../services/recommendation.service";
import CardsSkeleton from "../Skeletons/CardsSkeleton";
import activityService from "../../services/activity.service";

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
        const recommendations = await activityService.getActivitiesFromAI(trip.destinations);
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

  const applyFilters = (filters: Category[], search: string) => {
    let newFilteredRecommendations = recommendations;

    if (filters.length > 0) {
      const filtersNames = filters.map((filter) => filter.name);
      newFilteredRecommendations = newFilteredRecommendations.filter((rec) =>
        filtersNames.every((name) => rec.category == (name))
      );
    }

    if (search) {
      newFilteredRecommendations = newFilteredRecommendations.filter(
        (recommendation) =>
          recommendation.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRecommendations(newFilteredRecommendations);
  };

  const onActivitySearch = (search: string) => {
    setSearchValue(search);
    applyFilters(selectedFilters, search);
  };

  const filterRecommendations = (filters: Category[]) => {
    setSelectedFilters(filters);
    applyFilters(filters, searchValue);
  };

  const goBackToSchedule = () => {
    navigate("/schedule", { state: { trip, showActions: true } });
  };

  return (
    <Container sx={{ paddingTop: "14px", paddingBottom: "14px" }}>
      <Stack spacing={8} sx={{ marginTop: 5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
          <SearchBar
            placeholder="Search for Attractions..."
            onSearch={onActivitySearch}
          />
          <ActivityFilters onFilterSelected={filterRecommendations} />
        </Stack>
        <Stack spacing={2} sx={{ alignItems: "flex-start", width: "100%" }}>
          <Typography variant="h3" sx={{ fontSize: 20, color: "#333" }}>
            Recommendations For Attractions
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Click an activity to add it to your trip!
          </Typography>
          {loading ? (
            <CardsSkeleton numInRow={4} />
          ) : error ? (
            <Typography color="error">
              Failed To Fetch recommendations
            </Typography>
          ) : (
            <Box sx={{ width: "100%" }}>
              <RecommendationsGrid
                recommendations={filteredRecommendations}
                trip={trip}
              />
            </Box>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default ActivitiesPage;
