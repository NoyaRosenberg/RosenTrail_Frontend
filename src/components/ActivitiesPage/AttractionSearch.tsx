import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTextField } from "../../theme";

const AttractionSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    // Perform search
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
      <Typography variant="h3" sx={{ fontSize: 20, color: "#333" }}>
        Search For Attractions In New York
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <StyledTextField
          className="search"
          fullWidth
          variant="outlined"
          placeholder="Search for Attractions..."
          value={searchValue}
          onChange={handleSearchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "90%" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ padding: 1, width: "10%", borderRadius: '50px' }}
        >
          Search
        </Button>
      </Box>
    </Stack>
  );
};

export default AttractionSearch;
