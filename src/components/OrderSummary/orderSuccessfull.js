import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const CongratulationsModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="congratulations-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <IconButton aria-label="close" onClick={handleClose}   sx={{
            position: "absolute !important",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}><CloseIcon/></IconButton>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green" }} />
        <Typography id="congratulations-modal" variant="h5" sx={{ mt: 2, mb: 2 }}>
          Congratulations!
        </Typography>
        <Typography variant="body1">
          Your order has been placed successfully.
        </Typography>
      </Box>
    </Modal>
  );
};

export default CongratulationsModal;

