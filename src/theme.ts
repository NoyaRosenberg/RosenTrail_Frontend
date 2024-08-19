import {List, Popper, TextField} from "@mui/material";
import {lightGreen} from "@mui/material/colors";
import {createTheme, styled} from "@mui/material/styles";

export const StyledTextField = styled(TextField)({
    "&.search .MuiOutlinedInput-root": {
        borderRadius: "20px",
        padding: "0 12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        border: "none"
    },
    "&.search .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove the outline border
    },
    "&.search .MuiOutlinedInput-input": {
        padding: "12px 0",
    },
});

export const StyledPopper = styled(Popper)({
    '& .MuiAutocomplete-listbox': {
        maxHeight: '200px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#a8a8a8',
        },
    },
});

export const StyledListbox = styled(List)({
    maxHeight: '200px',
    overflowY: 'auto',
});

const theme = createTheme({
    palette: {
        primary: {
            main: lightGreen[500],
        },
    },
    typography: {
        fontFamily: "Quicksand, sans-serif",
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "white",
                },
                outlined: {
                    color: lightGreen[500],
                },
            },
        },
        MuiButtonGroup: {
            styleOverrides: {
                grouped: {
                    color: lightGreen[500]
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    width: "100%",
                    "& .MuiAutocomplete-inputRoot": {
                        padding: "0 12px !important",
                    },
                    "& .MuiAutocomplete-input": {
                        padding: "12px 0 !important",
                    },
                },
            },
        },
    },
});


export default theme;
