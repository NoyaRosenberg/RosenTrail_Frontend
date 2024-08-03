import { TextField } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { createTheme, styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)({
  "&.search .MuiOutlinedInput-root": {
    borderRadius: "20px",
    padding: "0 12px",
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
