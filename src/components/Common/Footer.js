import React from 'react';
import { Box, Typography } from '@mui/material';
const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'rgb(57, 58, 61)', color: 'white', py: 2, mt: 'auto' }}>
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} My React App. All rights reserved.
      </Typography>
    </Box>
  );
};
export default Footer;