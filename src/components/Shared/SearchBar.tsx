import React, {ChangeEvent, SyntheticEvent} from "react";
import {Stack, Autocomplete, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {StyledListbox, StyledPopper, StyledTextField} from "../../theme";

export interface AutoCompleteSearchBarProps {
    placeholder: string;
    onSearch: (searchValue: string) => void;
    suggestions?: string[];
    onSuggestionClick?: (suggestion: string) => void;
}

const SearchBar: React.FC<AutoCompleteSearchBarProps> = ({
                                                             placeholder,
                                                             onSearch,
                                                             suggestions = [],
                                                             onSuggestionClick
                                                         }) => {
    const [searchValue, setSearchValue] = React.useState<string>("");

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    const handleSuggestionSelect = (
        _event: SyntheticEvent,
        newValue: string | null
    ) => {
        if (newValue && onSuggestionClick) {
            onSuggestionClick(newValue);
        }
    };

    return (
        <Stack spacing={2} sx={{alignItems: "flex-start", position: "relative", width: "100%"}}>
            <Autocomplete
                freeSolo
                options={suggestions || []}
                inputValue={searchValue}
                onInputChange={(_, newInputValue) => setSearchValue(newInputValue)}
                onChange={handleSuggestionSelect}
                sx={{width: "100%"}}
                PopperComponent={(props) => <StyledPopper {...props} />}
                ListboxComponent={(props) => <StyledListbox {...props} />}
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        className="search"
                        fullWidth
                        variant="outlined"
                        placeholder={placeholder}
                        onChange={handleSearchInput}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                        sx={{width: "100%"}}
                    />
                )}
            />
        </Stack>
    );
};

export default SearchBar;
