import React from 'react';
import { AppBar, Typography,Box } from '@mui/material';
const Header = () => {
  return (
    <AppBar position="static" sx={{bgcolor:'#e0f7fa',color: '#00796b'}}>
      <Box sx={{ bgcolor: '#e0f7fa', color: '#00796b', py: 2, mt: 'auto' }}>
      <Typography variant="h6"  align="center" component="div" sx={{color:'#00796b'}}>
          Complete Your Checkout Adventure
        </Typography>
    </Box>
    </AppBar>
  );
};

export default Header;