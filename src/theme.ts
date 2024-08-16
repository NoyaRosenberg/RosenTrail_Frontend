import { TextField } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { createTheme, styled } from "@mui/material/styles";

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
    }
  },
});



export default theme;
