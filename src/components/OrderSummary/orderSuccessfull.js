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


// import React, { useState } from 'react';


// const CongratsModal = ({ onClose }) => {
//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <h2>Congratulations!</h2>
//           <p>Your order has been successfully placed.</p>
//           <button onClick={onClose}>Close</button>
//         </div>
//       </div>
//     );
//   };

// const OrderConfirmation = () => {
//   const [showModal, setShowModal] = useState(true);

//   const handleConfirm = () => {
//     // handle order confirmation logic here
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     // navigate to home page or other page as needed
//   };

//   return (
//     <div>
//       {/* render order confirmation components and button */}
//       {showModal && <CongratsModal onClose={handleClose} />}
//     </div>
//   );
// };

// export default OrderConfirmation;

// // import React from 'react';


// // export default CongratsModal;
// // import React, { useState } from 'react';
// // import "../../styles/orderSummary.css";

// // const OrderSuccessModal = () => {
// //     const [isModalVisible, setIsModalVisible] = useState(true);

// //     const closeModal = () => {
// //         setIsModalVisible(false);
// //     };

// //     return (
// //         <div>
// //             {isModalVisible && (
// //                 <div className="modal-overlay" onClick={closeModal}>
// //                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //                         <svg
// //                             className="success-icon"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                             fill="none"
// //                             viewBox="0 0 24 24"
// //                             stroke="currentColor"
// //                             strokeWidth="2"
// //                         >
// //                             <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 d="M9 12l2 2l4-4m1-5a9 9 0 110 18a9 9 0 010-18z"
// //                             />
// //                         </svg>
// //                         <h2>Congratulations!</h2>
// //                         <p>Your order placement is successful.</p>
// //                         <button onClick={closeModal}>Close</button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default OrderSuccessModal;