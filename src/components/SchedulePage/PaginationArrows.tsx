import {Box, Fab, Tooltip} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const arrowStyle = {width: "35px", height: "35px"};

interface PaginationArrowsProps {
    disablePrev: boolean;
    disableNext: boolean;
    onPrevClick: () => void;
    onNextClick: () => void;
}

const PaginationArrows = ({disablePrev, disableNext, onPrevClick, onNextClick}: PaginationArrowsProps) => {
    return (
        <Box display="flex" gap={1}>
            <Tooltip title="Previous Day">
                <Fab size="small" sx={arrowStyle} disabled={disablePrev} onClick={onPrevClick}>
                    <KeyboardArrowLeftIcon/>
                </Fab>
            </Tooltip>
            <Tooltip title="Next Day">
                <Fab size="small" sx={arrowStyle} disabled={disableNext} onClick={onNextClick}>
                    <KeyboardArrowRightIcon/>
                </Fab>
            </Tooltip>
        </Box>
    )
}

export default PaginationArrows;