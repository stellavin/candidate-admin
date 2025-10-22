import { TableRow, TableCell, Chip, IconButton, Tooltip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Candidate } from '../../features/candidates/graphql/types';

const EMPTY_VALUE = '-';

const STATUS_COLOR_MAP: Record<string, ChipProps['color']> = {
  active: 'success',
  approved: 'success',
  applied: 'success',
  pending: 'warning',
  shortlisted: 'warning',
  rejected: 'error',
};

interface CandidateRowProps {
  candidate: Candidate;
  rowNumber: number;
}

const getStatusColor = (status?: string): ChipProps['color'] => {
  if (!status) return 'default';
  return STATUS_COLOR_MAP[status.toLowerCase()] ?? 'default';
};

const formatStatusLabel = (status: string): string => {
  const lower = status.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export function CandidateRow({ candidate, rowNumber }: CandidateRowProps) {
  const handleViewCandidate = () => {
    // TODO: Navigate to candidate detail page
    console.log('View candidate:', candidate.id);
  };

  return (
    <TableRow hover>
      <TableCell sx={{ width: 60, fontWeight: 500, color: 'text.secondary' }}>
        {rowNumber}
      </TableCell>
      <TableCell>{candidate.firstName ?? EMPTY_VALUE}</TableCell>
      <TableCell>{candidate.lastName ?? EMPTY_VALUE}</TableCell>
      <TableCell>{candidate.email ?? EMPTY_VALUE}</TableCell>
      <TableCell>
        {candidate.status ? (
          <Chip 
            label={formatStatusLabel(candidate.status)} 
            size="small" 
            color={getStatusColor(candidate.status)} 
          />
        ) : (
          EMPTY_VALUE
        )}
      </TableCell>
      <TableCell sx={{ width: 100 }}>
        <Tooltip title="View candidate details">
          <IconButton 
            size="small" 
            color="primary"
            onClick={handleViewCandidate}
            aria-label={`View ${candidate.firstName} ${candidate.lastName}`}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

