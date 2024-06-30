import {
  Box,
  InputAdornment,
  Stack
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTextField } from "../theme";
import React from "react";

export interface SearchBarProps {
  placeholder: string;
  onSearch: (searchValue: string) => void;
}

const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); 
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
          sx={{ width: "100%" }}
        />
      </Box>
    </Stack>
  );
};

export default SearchBar;
