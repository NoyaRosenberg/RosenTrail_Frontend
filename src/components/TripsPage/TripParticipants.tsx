import React from "react";
import { Box, Avatar, Tooltip, Chip } from "@mui/material";
import { User } from "../../services/auth.service";

interface TripParticipantsProps {
  participants: User[];
}

const TripParticipants = ({ participants }: TripParticipantsProps) => {
  return (
    <Box display="flex" alignItems="center" gap="2">
      <Chip
        key="participants:"
        label="Participants:"
        variant="outlined"
        sx={{
          borderColor: "primary.main",
          color: "#666",
          backgroundColor: "white",
          fontSize: "1rem",
          marginRight: "5px",
        }}
      />
      <Box display="flex">
        {participants.map((participant, index) => (
          <Tooltip title={participant.username} key={index}>
            {participant.imageData ? (
              <Avatar
                src={participant.imageData}
                className="participant-avatar"
              ></Avatar>
            ) : (
              <Avatar className="participant-avatar">
                {participant.username.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default TripParticipants;
