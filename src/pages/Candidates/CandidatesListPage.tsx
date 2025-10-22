import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { CandidateTable } from '../../components/tables/CandidateTable';
import { useCandidates } from './hooks/useCandidates';
import { setSearchParams, parseFiltersFromUrl } from '../../lib/urlState';

export function CandidatesListPage() {
  const initialFilters = parseFiltersFromUrl();
  
  const [firstName, setFirstName] = useState(initialFilters.firstName);
  const [lastName, setLastName] = useState(initialFilters.lastName);
  const [page, setPage] = useState(initialFilters.page - 1); // 0-based for MUI
  const [pageSize, setPageSize] = useState(10);

  const { rows, loading, error, pageInfo, refetch } = useCandidates({
    firstName,
    lastName,
    page,
    pageSize,
  });

  const handleFiltersChange = useCallback(
    (filters: { firstName: string; lastName: string }) => {
      setFirstName(filters.firstName);
      setLastName(filters.lastName);
      setPage(0);
      
      setSearchParams({
        first: filters.firstName,
        last: filters.lastName,
        page: 1,
      });
    },
    []
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    setSearchParams({
      first: firstName,
      last: lastName,
      page: newPage + 1,
    });
  }, [firstName, lastName]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    setSearchParams({
      first: firstName,
      last: lastName,
      page: 1,
    });
  }, [firstName, lastName]);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Candidates
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and filter all candidate applications
        </Typography>
      </Box>


      <CandidateTable
        candidates={rows}
        loading={loading}
        error={error}
        page={page}
        pageSize={pageSize}
        totalCount={pageInfo.totalCount}
        hasNextPage={pageInfo.hasNextPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onRetry={refetch}
      />
    </Box>
  );
}

