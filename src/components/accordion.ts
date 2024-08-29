

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const products = [
  {
    id: 1,
    name: 'Electronics',
    children: [
      { id: 11, name: 'Laptops' },
      { id: 12, name: 'Smartphones' },
      { id: 13, name: 'Cameras' },
    ],
  },
  {
    id: 2,
    name: 'Home Appliances',
    children: [
      { id: 21, name: 'Refrigerators' },
      { id: 22, name: 'Washing Machines' },
      { id: 23, name: 'Microwaves' },
    ],
  },
  {
    id: 3,
    name: 'Furniture',
    children: [
      { id: 31, name: 'Beds' },
      { id: 32, name: 'Sofas' },
      { id: 33, name: 'Tables' },
    ],
  },
];

const ProductAccordion = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', mt: 4 }}>
      {products.map((product) => (
        <Accordion key={product.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${product.id}-content`}
            id={`panel${product.id}-header`}
            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {product.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#fafafa', borderRadius: 1 }}>
            <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 1, boxShadow: 2 }}>
              <List>
                {product.children.map((child) => (
                  <ListItem key={child.id} sx={{ pl: 0 }}>
                    <ListItemText
                      primary={child.name}
                      primaryTypographyProps={{ variant: 'body1', sx: { fontWeight: 'medium' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ProductAccordion;