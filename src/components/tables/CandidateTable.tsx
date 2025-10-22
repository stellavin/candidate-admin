import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Skeleton,
  Typography,
  Button,
} from '@mui/material';
import { Candidate } from '../../features/candidates/graphql/types';
import { CandidateRow } from './CandidateRow';

interface CandidateTableProps {
  candidates: Candidate[];
  loading: boolean;
  error?: Error;
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRetry?: () => void;
}

export function CandidateTable({
  candidates,
  loading,
  error,
  page,
  pageSize,
  totalCount,
  hasNextPage,
  onPageChange,
  onPageSizeChange,
  onRetry,
}: CandidateTableProps) {
  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageSizeChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Applied Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
              </TableRow>
            ))}
            
            {!loading && candidates.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No candidates found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      There are no candidates to display at the moment.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            
            {!loading && candidates.length > 0 && candidates.map((candidate) => (
              <CandidateRow key={candidate.id} candidate={candidate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && candidates.length > 0 && (
        <TablePagination
          component="div"
          count={hasNextPage ? -1 : page * pageSize + candidates.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
        />
      )}
    </Box>
  );
}

