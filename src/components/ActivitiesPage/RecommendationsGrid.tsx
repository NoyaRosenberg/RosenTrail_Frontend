import { Grid } from "@mui/material";
import PlaceCard from "../PlaceCard";

export interface Recommendation {
  name: string;
  description: string;
  image: string;
}

export interface RecommendationsGrisProps {
  recommendations: Recommendation[];
}

const RecommendationsGrid = ({ recommendations }: RecommendationsGrisProps) => {
  const addActivity = () => {
    // Add activity to trip
  };

  return (
    <Grid container spacing={2}>
      {recommendations.map((rec, index) => (
        <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: "flex" }}>
          <PlaceCard
            name={rec.name}
            description={rec.description}
            image={rec.image}
            onCardClick={addActivity}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecommendationsGrid;
