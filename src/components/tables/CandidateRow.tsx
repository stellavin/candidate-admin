import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import { Candidate } from '../../features/candidates/graphql/types';

interface CandidateRowProps {
  candidate: Candidate;
}

export function CandidateRow({ candidate }: CandidateRowProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TableRow hover>
      <TableCell>{candidate.firstName || '-'}</TableCell>
      <TableCell>{candidate.lastName || '-'}</TableCell>
      <TableCell>{candidate.email || '-'}</TableCell>
      <TableCell>
        {candidate.role ? (
          <Chip label={candidate.role} size="small" color="primary" variant="outlined" />
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>{formatDate(candidate.appliedDate)}</TableCell>
    </TableRow>
  );
}

