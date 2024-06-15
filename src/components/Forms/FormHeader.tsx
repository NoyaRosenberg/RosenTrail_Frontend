import { Box, Typography } from "@mui/material";
import "../../styles/Forms.css";

export interface FormHeaderProps {
  mainTitle: string;
  secondaryTitle: string;
}

const FormHeader = ({ mainTitle, secondaryTitle }: FormHeaderProps) => {
  return (
    <Box className="form-header">
      <Typography variant="h4" component="h2" gutterBottom>
        {mainTitle}
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        {secondaryTitle}
      </Typography>
    </Box>
  );
};

export default FormHeader;
