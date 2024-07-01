import React from "react";
import { Trip } from "../../services/trip.service";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditTripForm from "./EditTripForm";
import { User } from "../../services/user.service";

type EditTripProps = {
  trip: Trip;
  participants: User[];
  open: boolean;
  onClose: () => void;
};

const EditTripDialog = ({
  trip,
  participants,
  open,
  onClose,
}: EditTripProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "15px",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle color="primary">
        Edit Trip To {trip.destinations.join(", ")}
      </DialogTitle>
      <DialogContent>
        <EditTripForm trip={trip} participants={participants}></EditTripForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditTripDialog;
