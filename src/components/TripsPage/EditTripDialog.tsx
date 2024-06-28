import React from "react";
import { Trip } from "../../services/trip.service";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditTripForm from "./EditTripForm";

type EditTripProps = {
  trip: Trip;
  open: boolean;
  onClose: () => void;
};

const EditTripDialog = ({ trip, open, onClose }: EditTripProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="md"
      sx={{ textAlign: "center" }}
      PaperProps={{
        sx: {
          borderRadius: "15px",
        },
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onClose();
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
      <DialogContent>
        <EditTripForm trip={trip}></EditTripForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditTripDialog;
