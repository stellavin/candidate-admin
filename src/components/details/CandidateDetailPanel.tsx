import { 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Chip, 
  CircularProgress,
  Button,
  Link
} from '@mui/material';
import type { ChipProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { useCandidate } from '../../pages/Candidates/hooks/useCandidate';
import styles from './CandidateDetailPanel.module.css';

const STATUS_COLOR_MAP: Record<string, ChipProps['color']> = {
  active: 'success',
  approved: 'success',
  applied: 'success',
  pending: 'warning',
  shortlisted: 'warning',
  rejected: 'error',
};

const getStatusColor = (status?: string): ChipProps['color'] => {
  if (!status) return 'default';
  return STATUS_COLOR_MAP[status.toLowerCase()] ?? 'default';
};

const formatStatusLabel = (status: string): string => {
  const lower = status.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

interface CandidateDetailPanelProps {
  candidateId: string;
  onClose: () => void;
}

export function CandidateDetailPanel({ candidateId, onClose }: CandidateDetailPanelProps) {
  const { candidate, loading, error, refetch } = useCandidate({ id: candidateId });

  if (loading) {
    return (
      <Paper sx={{ p: 3, height: '100%' }}>
        <Box className={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, height: '100%' }}>
        <Box className={styles.errorContainer}>
          <Typography variant="h6" color="error" gutterBottom>
            Error loading candidate details
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {error.message}
          </Typography>
          <Button variant="contained" onClick={refetch}>
            Retry
          </Button>
        </Box>
      </Paper>
    );
  }

  if (!candidate) {
    return (
      <Paper sx={{ p: 3, height: '100%' }}>
        <Box className={styles.errorContainer}>
          <Typography variant="h6" color="text.secondary">
            Candidate not found
          </Typography>
        </Box>
      </Paper>
    );
  }

  const fullName = [candidate.firstName, candidate.lastName].filter(Boolean).join(' ') || 'Unknown';

  return (
    <Paper sx={{ p: 3, height: '100%', position: 'sticky', top: 0 }} className={styles.detailPanel}>
      <Box className={styles.header}>
        <Box className={styles.headerInfo}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
            {fullName}
          </Typography>
          {candidate.status && (
            <Chip 
              label={formatStatusLabel(candidate.status)} 
              size="small" 
              color={getStatusColor(candidate.status)}
              className={styles.statusChip}
            />
          )}
        </Box>
        <IconButton onClick={onClose} className={styles.closeButton} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Basic Information */}
      <Box className={styles.section} sx={{ mb: 3 }}>
        <Typography className={styles.sectionTitle}>Details</Typography>
        
        <Box className={styles.detailRow}>
          <Box className={styles.detailLabel}>First Name</Box>
          <Typography className={styles.detailValue}>
            {candidate.firstName || '-'}
          </Typography>
        </Box>

        <Box className={styles.detailRow}>
          <Box className={styles.detailLabel}>Last Name</Box>
          <Typography className={styles.detailValue}>
            {candidate.lastName || '-'}
          </Typography>
        </Box>

        {candidate.email && (
          <Box className={styles.detailRow}>
            <Box className={styles.detailLabel}>
              <EmailIcon sx={{ fontSize: 14 }} />
              <span>Email</span>
            </Box>
            <Typography className={styles.detailValue}>
              <Link href={`mailto:${candidate.email}`} className={styles.link}>
                {candidate.email}
              </Link>
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

