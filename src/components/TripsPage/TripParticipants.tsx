import React, { useEffect, useState } from "react";
import { Box, Avatar, Tooltip, Chip } from "@mui/material";
import tripService, { User } from "../../services/trip.service";

interface TripParticipantsProps {
  tripId: string;
}

const TripParticipants = ({ tripId }: TripParticipantsProps) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserParticipants = async () => {
      try {
        const participants = await tripService.getTripParticipants(tripId);
        setParticipants(participants!);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    getUserParticipants();
  }, [tripId]);

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
          marginRight: "10px",
        }}
      />
      <Box display="flex">
        {error && <p>Failed To Fetch Participants</p>}
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
