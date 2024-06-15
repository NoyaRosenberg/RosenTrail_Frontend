import { Typography } from "@mui/material";
import '../../styles/Forms.css'

export interface ErrorSectionProps {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorSectionProps) => {
  return (
    <Typography variant="body1" className="form-error">
      {errorMessage}
    </Typography>
  );
};

export default ErrorMessage;
