import React from 'react';
import { Grid } from '@mui/material';
import { People, PersonAdd, TrendingUp, WorkOutline } from '@mui/icons-material';
import { KpiCard } from '../../../components/data/KpiCard';

export function StatsCards() {
  // In a real app, these would come from API/GraphQL
  const stats = {
    totalCandidates: 1247,
    newThisWeek: 42,
    avgExperience: 5.3,
    activeRoles: 18,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard
          title="Total Candidates"
          value={stats.totalCandidates.toLocaleString()}
          delta={12}
          icon={<People />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <KpiCard
          title="New This Week"
          value={stats.newThisWeek}
          delta={8}
          icon={<PersonAdd />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <KpiCard
          title="Avg. Experience"
          value={`${stats.avgExperience} years`}
          delta={3}
          icon={<TrendingUp />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <KpiCard
          title="Active Roles"
          value={stats.activeRoles}
          delta={-5}
          icon={<WorkOutline />}
        />
      </Grid>
    </Grid>
  );
}

