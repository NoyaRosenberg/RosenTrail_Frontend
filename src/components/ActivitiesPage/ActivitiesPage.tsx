import React, { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Recommendations from "./Recommendations";
import AttractionSearch from "./AttractionSearch";
import ActivityFilters from "./ActivityFilters";
import { Recommendation } from "./RecommendationCard";

const ActivitiesPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      name: "Central Park",
      description: "Most visited urban park in the United States",
      image: "IMG_0316.jpeg",
    },
    {
      name: "Bryant Park",
      description: "Relax, play, eat",
      image: "IMG_0037.jpeg",
    },
    {
      name: "Roof Top Bar",
      description: "Eat and enjoy the view",
      image: "IMG_0129.jpeg",
    },
    {
      name: "Vessel",
      description: "Landmark in New York",
      image: "IMG_9899.jpeg",
    },
    {
      name: "Pizza Place",
      description: "Best pizza in town",
      image: "IMG_0048.jpeg",
    },
    {
      name: "Grand Central",
      description: "Historic train station",
      image: "IMG_9957.jpeg",
    },
    {
      name: "Skyline View",
      description: "Beautiful cityscape",
      image: "IMG_9880.jpeg",
    },
  ]);

  return (
    <>
      <Container sx={{ paddingTop: "14px" }}>
        <Stack spacing={8} sx={{ marginTop: 5 }}>
          <Stack spacing={2}>
            <AttractionSearch />
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
              <Recommendations recommendations={recommendations} />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ActivitiesPage;
