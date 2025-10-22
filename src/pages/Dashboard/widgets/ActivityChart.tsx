import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

export function ActivityChart() {
  // In a real app, this would render an actual chart using a library like recharts or victory
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Candidate Activity
        </Typography>
        <Box
          sx={{
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.hover',
            borderRadius: 1,
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TrendingUp sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5 }} />
          <Typography variant="body1" color="text.secondary">
            Chart placeholder - integrate with recharts, Chart.js, or Victory
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Shows candidate applications over time
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

