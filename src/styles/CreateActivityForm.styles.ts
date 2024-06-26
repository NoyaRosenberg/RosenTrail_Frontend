import styled from '@emotion/styled';
import { TextField, Button } from '@mui/material';

export const FormContainer = styled.div`
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #4CAF50;
  margin-bottom: 5px;
`;

export const Subtitle = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SaveButton = styled(Button)`
  background-color: #8BC34A;
  color: white;
  &:hover {
    background-color: #7CB342;
  }
`;