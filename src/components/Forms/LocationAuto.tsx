import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import React from "react";

interface AutocompleteInputProps {
    location: string;
    onLocationChange: (location: string) => void;
}

const AutocompleteInput = ({
    location,
    onLocationChange,
}: AutocompleteInputProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (inputValue) {
                try {
                    const response = await axios.get('/api/locations/suggestions', {
                        params: { input: inputValue }
                    });
                    setOptions(response.data);
                } catch (error) {
                    console.error("Failed to fetch locations:", error);
                }
            } else {
                setOptions([]);
            }
        };

        fetchSuggestions();
    }, [inputValue]);

    return (
        <Autocomplete
            value={location}
            onChange={(_, newValue) => onLocationChange(newValue || "")}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    required
                    variant="standard"
                    margin="dense"
                    label="Location"
                    fullWidth
                />
            )}
            ListboxProps={{
                style: {
                    maxHeight: "200px",
                    overflow: "auto",
                },
                className: "scrollable",
            }}
        />
    );
};

export default AutocompleteInput;
