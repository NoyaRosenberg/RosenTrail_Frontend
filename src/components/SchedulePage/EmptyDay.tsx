import {Box, Button, Card, Typography} from "@mui/material";

const boxStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 5,
    borderRadius: 2,
    backgroundColor: '#f5f5f5'
}

interface EmptyDayProps {
    onClick: () => void;
}

const EmptyDay = ({onClick}: EmptyDayProps) => {
    return (
        <Box sx={boxStyle} paddingLeft={2}>
            <Card sx={cardStyle}>
                <Box sx={boxStyle}>
                    <Typography variant="h5" component="div" color="secondary.main">
                        You haven't add attraction to this day yet!
                    </Typography>
                    <Typography variant="body1" sx={{color: "#666"}}>
                        Click on the button bellow to add an activity
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={onClick}>
                    Add some attractions!
                </Button>
            </Card>
        </Box>
    )
}

export default EmptyDay;