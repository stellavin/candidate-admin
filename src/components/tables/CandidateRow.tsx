import { TableRow, TableCell, Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { Candidate } from '../../features/candidates/graphql/types';

const EMPTY_VALUE = '-';

const STATUS_COLOR_MAP: Record<string, ChipProps['color']> = {
  active: 'success',
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
};

interface CandidateRowProps {
  candidate: Candidate;
}

const getStatusColor = (status?: string): ChipProps['color'] => {
  if (!status) return 'default';
  return STATUS_COLOR_MAP[status.toLowerCase()] ?? 'default';
};

export function CandidateRow({ candidate }: CandidateRowProps) {
  return (
    <TableRow hover>
      <TableCell>{candidate.firstName ?? EMPTY_VALUE}</TableCell>
      <TableCell>{candidate.lastName ?? EMPTY_VALUE}</TableCell>
      <TableCell>{candidate.email ?? EMPTY_VALUE}</TableCell>
      <TableCell>
        {candidate.status ? (
          <Chip 
            label={candidate.status} 
            size="small" 
            color={getStatusColor(candidate.status)} 
            variant="outlined" 
          />
        ) : (
          EMPTY_VALUE
        )}
      </TableCell>
    </TableRow>
  );
}

