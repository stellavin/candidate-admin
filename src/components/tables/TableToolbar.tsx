import React from 'react';
import { Toolbar, Typography, Box } from '@mui/material';

interface TableToolbarProps {
  title: string;
  actions?: React.ReactNode;
}

export function TableToolbar({ title, actions }: TableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        component="div"
      >
        {title}
      </Typography>
      {actions && <Box>{actions}</Box>}
    </Toolbar>
  );
}

