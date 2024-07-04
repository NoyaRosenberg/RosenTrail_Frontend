import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import RecommendationsGrid from "./RecommendationsGrid";
import SearchBar from "../SearchBar";
import ActivityFilters from "./ActivityFilters";
import recommendationService, {
  Recommendation,
} from "../../services/recommendation.service";
import { useLocation } from "react-router-dom";

const ActivitiesPage: React.FC = () => {
  const location = useLocation();
  const trip = location.state.trip;

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [filteredRecommendations, setFilteredReccomendations] = useState<
    Recommendation[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const recommendations =
          await recommendationService.getRecommendations();
        setRecommendations(recommendations!);
        setFilteredReccomendations(recommendations!);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getRecommendations();
    onActivitySearch("");
  }, []);

  const onActivitySearch = (searchValue: string) => {
    const newFilteredRecommendations = recommendations.filter(
      (recommendation) =>
        recommendation.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredReccomendations(newFilteredRecommendations);
  };

  return (
    <Container sx={{ paddingTop: "14px", paddingBottom: "14px" }}>
      <Stack spacing={8} sx={{ marginTop: 5 }}>
        <Stack spacing={2}>
          <Typography variant="h3" sx={{ fontSize: 20, color: "#333" }}>
            Search For Attractions In New York
          </Typography>
          <SearchBar
            placeholder="Search for Attractions..."
            onSearch={onActivitySearch}
          />
          <ActivityFilters />
        </Stack>
        <Stack spacing={2} sx={{ alignItems: "flex-start", width: "100%" }}>
          <Typography variant="h3" sx={{ fontSize: 20, color: "#333" }}>
            Recommendations For Attractions
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Click an activity to add it to your trip!
          </Typography>
          <Box sx={{ width: "100%" }}>
            {error ? (
              <Typography>Failed To Fetch recommendations</Typography>
            ) : (
              <RecommendationsGrid
                recommendations={filteredRecommendations}
                trip={trip}
              />
            )}
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ActivitiesPage;
