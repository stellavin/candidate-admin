import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { StatsCards } from './widgets/StatsCards';
import { ActivityChart } from './widgets/ActivityChart';
import { RecentCandidates } from './widgets/RecentCandidates';

export function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {/* KPI Cards */}
      <Box sx={{ mb: 4 }}>
        <StatsCards />
      </Box>

      {/* Charts and Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ActivityChart />
        </Grid>

        <Grid item xs={12} lg={4}>
          <RecentCandidates />
        </Grid>
      </Grid>
    </Box>
  );
}

