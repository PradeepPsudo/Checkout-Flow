import React from 'react';
import { AppBar, Typography,Box } from '@mui/material';
const Header = () => {
  return (
    <AppBar position="static" sx={{bgcolor:'rgb(57, 58, 61)',color: '#00796b'}}>
      <Box sx={{ bgcolor: 'rgb(57, 58, 61)', color: 'white', py: 2, mt: 'auto' }}>
      <Typography variant="h6"  align="center" component="div" sx={{color:'white'}}>
          Complete Your Checkout Adventure
        </Typography>
    </Box>
    </AppBar>
  );
};

export default Header;