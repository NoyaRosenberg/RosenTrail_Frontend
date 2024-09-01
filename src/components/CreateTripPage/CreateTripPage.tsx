import {Box} from '@mui/material';
import CreateTripForm from './CreateTripForm';
import '../../styles/CreateTrip.css';
import '../../styles/Forms.css';

const CreateTripPage = () => {
    return (
        <Box className="form-page-main-container">
            <Box className="form-page-left-container">
                <Box className="form-page-background-image create-trip-image"/>
            </Box>
            <Box className="form-page-right-container">
                <CreateTripForm/>
            </Box>
        </Box>
    );
};

export default CreateTripPage;