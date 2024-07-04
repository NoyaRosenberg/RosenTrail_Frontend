import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import RecommendationsGrid from "./RecommendationsGrid";
import SearchBar from "../SearchBar";
import ActivityFilters from "./ActivityFilters";
import recommendationService, {
  Category,
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
  }, []);

  const onActivitySearch = (searchValue: string) => {
    const newFilteredRecommendations = recommendations.filter(
      (recommendation) =>
        recommendation.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredReccomendations(newFilteredRecommendations);
  };

  const filterRecommendations = (filters: Category[]) => {
    if (filters.length == 0) {
      setFilteredReccomendations(recommendations);
    } else {
      const filtersId = filters.map((filter) => filter.id);
      const newFilteredRecommendations = recommendations.filter((rec) =>
        filtersId.every((id) => rec.categoriesId.includes(id))
      );

      setFilteredReccomendations(newFilteredRecommendations);
    }
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
          <ActivityFilters onFilterSelected={filterRecommendations} />
        </Stack>
        <Stack spacing={2} sx={{ alignItems: "flex-start", width: "100%" }}>
          <Typography variant="h3" sx={{ fontSize: 20, color: "#333" }}>
            Recommendations For Attractions
          </Typography>
          {error ? (
            <Typography color="error">Failed To Fetch recommendations</Typography>
          ) : filteredRecommendations.length == 0 ? (
            <Typography variant="body1" sx={{ color: "#666" }}>
              There's no recommendation that answer this critiria
            </Typography>
          ) : (
            <>
              <Typography variant="body1" sx={{ color: "#666" }}>
                Click an activity to add it to your trip!
              </Typography>
              <Box sx={{ width: "100%" }}>
                <RecommendationsGrid
                  recommendations={filteredRecommendations}
                  trip={trip}
                />
              </Box>
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default ActivitiesPage;
