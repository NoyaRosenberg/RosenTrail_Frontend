import { styled } from '@mui/system';
import { TextField, Button } from '@mui/material';
import {lightGreen} from "@mui/material/colors";

export const FormContainer = styled('div')({
  width: '100%',
  padding: '30px 60px 30px 60px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center"
});

export const Title = styled('h2')({
  color: lightGreen[500],
  marginBottom: '5px',
});

export const Subtitle = styled('p')({
  color: '#666',
  marginBottom: '20px',
});

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  gap: '15px',
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
});

export const ParticipantsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const SaveButton = styled(Button)({
  backgroundColor: '#8BC34A',
  color: 'white',
  '&:hover': {
    backgroundColor: '#7CB342',
  },
});