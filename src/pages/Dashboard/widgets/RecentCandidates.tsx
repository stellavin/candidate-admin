import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Box,
} from '@mui/material';
import { Person } from '@mui/icons-material';

interface RecentCandidate {
  id: string;
  name: string;
  role: string;
  appliedDate: string;
  status: 'new' | 'reviewed' | 'interview';
}

const mockCandidates: RecentCandidate[] = [
  { id: '1', name: 'John Doe', role: 'Software Engineer', appliedDate: '2 hours ago', status: 'new' },
  { id: '2', name: 'Jane Smith', role: 'Product Manager', appliedDate: '5 hours ago', status: 'reviewed' },
  { id: '3', name: 'Bob Johnson', role: 'Designer', appliedDate: '1 day ago', status: 'interview' },
  { id: '4', name: 'Alice Williams', role: 'Data Analyst', appliedDate: '1 day ago', status: 'new' },
  { id: '5', name: 'Charlie Brown', role: 'DevOps Engineer', appliedDate: '2 days ago', status: 'reviewed' },
];

const statusColors = {
  new: 'success',
  reviewed: 'warning',
  interview: 'info',
} as const;

export function RecentCandidates() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Candidates
        </Typography>
        <List>
          {mockCandidates.slice(0, 3).map((candidate) => (
            <ListItem
              key={candidate.id}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={candidate.name}
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography variant="body2" component="span">
                      {candidate.role}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" component="span">
                      • {candidate.appliedDate}
                    </Typography>
                  </Box>
                }
              />
              <Chip
                label={candidate.status}
                size="small"
                color={statusColors[candidate.status]}
                sx={{ textTransform: 'capitalize' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

