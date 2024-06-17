import { Typography } from "@mui/material";
import '../../styles/Forms.css'
import React from "react";

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
