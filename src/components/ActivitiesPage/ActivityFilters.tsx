import { Box, Chip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import recommendationService, {
  Category,
} from "../../services/recommendation.service";

interface ActivityFiltersProps {
  onFilterSelected: (filters: Category[]) => void;
}

const ActivityFilters = ({ onFilterSelected }: ActivityFiltersProps) => {
  const [activityFilters, setActivityFilters] = useState<Category[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFilters = async () => {
      try {
        const filters = await recommendationService.getCategories();
        setActivityFilters(filters!);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getFilters();
  }, []);

  useEffect(() => {
    onFilterSelected(selectedFilters);
  }, [selectedFilters, onFilterSelected]);

  const toggleFilter = (filter: Category) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.some((category) => category.id === filter.id)
        ? prevFilters.filter((category) => category.id !== filter.id)
        : [...prevFilters, filter]
    );
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {error ? (
        <Typography color="error">Failed To Get Filters</Typography>
      ) : (
        activityFilters.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.name}
            clickable
            color={selectedFilters.includes(filter) ? "primary" : "default"}
            onClick={() => toggleFilter(filter)}
          />
        ))
      )}
    </Box>
  );
};

export default ActivityFilters;
