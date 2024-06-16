import { Grid } from "@mui/material";
import RecommendationCard, { Recommendation } from "./RecommendationCard";
import React from "react";
export interface RecommendationsProps {
  recommendations: Recommendation[];
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <Grid container spacing={2}>
      {recommendations.map((rec, index) => (
        <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: "flex" }}>
          <RecommendationCard recommendation={rec} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Recommendations;
