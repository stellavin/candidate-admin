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
} from '@mui/material';
import { Candidate } from '../../features/candidates/graphql/types';
import { CandidateRow } from './CandidateRow';
import { TableSkeleton } from '../feedback/TableSkeleton';
import { TableEmpty } from '../feedback/TableEmpty';
import { TableError } from '../feedback/TableError';

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
            {loading && <TableSkeleton rows={pageSize} columns={5} />}
            
            {!loading && error && (
              <TableError colSpan={5} message={error.message} onRetry={onRetry} />
            )}
            
            {!loading && !error && candidates.length === 0 && (
              <TableEmpty colSpan={5} message="No candidates found" />
            )}
            
            {!loading && !error && candidates.map((candidate) => (
              <CandidateRow key={candidate.id} candidate={candidate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && !error && candidates.length > 0 && (
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

