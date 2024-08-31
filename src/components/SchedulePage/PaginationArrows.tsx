import {Box, Fab, Tooltip} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const arrowStyle = {width: "35px", height: "35px"};

const PaginationArrows = () => {
    return (
        <Box display="flex" gap={1}>
            <Tooltip title="Previous Day">
                <Fab size="small" sx={arrowStyle}>
                    <KeyboardArrowLeftIcon/>
                </Fab>
            </Tooltip>
            <Tooltip title="Next Day">
                <Fab size="small" sx={arrowStyle}>
                    <KeyboardArrowRightIcon/>
                </Fab>
            </Tooltip>
        </Box>
    )
}

export default PaginationArrows;