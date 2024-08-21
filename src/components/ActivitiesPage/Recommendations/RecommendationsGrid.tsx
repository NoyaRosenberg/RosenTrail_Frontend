import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import PlaceCard from "../../PlaceCard";
import { Trip } from "../../../services/trip.service";
import { Recommendation } from "../../../services/recommendation.service";
import { useState } from "react";
import CreateActivityPage from "../../CreateActivityPage/CreateActivityPage";

export interface RecommendationsGrisProps {
  recommendations: Recommendation[];
  trip: Trip;
}

const RecommendationsGrid = ({
  recommendations,
  trip,
}: RecommendationsGrisProps) => {
  const [open, setOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation | null>(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedRecommendation(null);
  };
  const addActivity = (rec: Recommendation) => {
    setSelectedRecommendation(rec);
    setOpen(true);
  };

  return (
    <Grid container spacing={2} sx={{paddingLeft: "2px", paddingBottom: "5px", paddingRight: "10px"}}>
      {recommendations.map((rec, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
          <PlaceCard
            name={rec.name}
            description={rec.description}
            image={rec.image}
            onCardClick={() => addActivity(rec)}
          />
        </Grid>
      ))}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Edit Your Activity</DialogTitle>
        <DialogContent>
          <CreateActivityPage
            location={selectedRecommendation?.name ?? ""}
            description={selectedRecommendation?.description ?? ""}
            cost={selectedRecommendation?.cost ?? 0}
            trip={trip}
            imageUrl={selectedRecommendation?.image}
            categories={selectedRecommendation?.categories}
            onClose={handleClose}
          />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RecommendationsGrid;
