import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import '../../styles/Forms.css'

const ContactInfo = () => {
  return (
    <Box className="contact-info">
      <Typography variant="body2" className="contact-info">
        Need help? Contact us at:
        <Link to={"mailto:Wonderplan@gmail.com"}>Wonderplan@gmail.com</Link>
      </Typography>
    </Box>
  );
};

export default ContactInfo;
