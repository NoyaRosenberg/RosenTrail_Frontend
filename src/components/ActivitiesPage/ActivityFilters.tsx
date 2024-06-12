import { Box, Chip } from "@mui/material";
import { useState } from "react";

const ActivityFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activityFilters, setActivityFilters] = useState<string[]>([
    "Junk Food",
    "Museums & Theatres",
    "Fancy Restaurants",
    "View Buildings",
    "Art & Cultural",
    "Kid Friendly",
    "Amusement Parks",
    "Outdoor Walks",
  ]);

  const toggleFilter = (activity: string) => {
    setSelectedFilters((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {activityFilters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          clickable
          color={selectedFilters.includes(filter) ? "primary" : "default"}
          onClick={() => toggleFilter(filter)}
        />
      ))}
    </Box>
  );
};

export default ActivityFilters;
