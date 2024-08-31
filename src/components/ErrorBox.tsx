import {Box, Typography} from "@mui/material";

interface ErrorProps {
    error: string;
}

const ErrorBox = ({error}: ErrorProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
            }}
        >
            <Typography gutterBottom variant="h6" color="error">
                Opps!
            </Typography>
            <Typography color="error">
                {error}
            </Typography>
        </Box>
    )
}

export default ErrorBox;