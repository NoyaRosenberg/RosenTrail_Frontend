import {
  Box,
  Button,
  InputAdornment,
  Stack
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTextField } from "../theme";

export interface SearchBarProps {
  placeholder: string;
  onSearch: (searchValue: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
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
          placeholder={placeholder}
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
          onClick={() => onSearch(searchValue)}
          sx={{ padding: 1, width: "10%", borderRadius: '50px' }}
        >
          Search
        </Button>
      </Box>
    </Stack>
  );
};

export default SearchBar;
