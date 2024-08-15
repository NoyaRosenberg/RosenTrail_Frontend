import { styled } from '@mui/system';
import { TextField, Button } from '@mui/material';

export const FormContainer = styled('div')({
  width: '400px',
  padding: '20px',
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

export const Title = styled('h2')({
  color: '#4CAF50',
  marginBottom: '5px',
});

export const Subtitle = styled('p')({
  color: '#666',
  marginBottom: '20px',
});

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
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