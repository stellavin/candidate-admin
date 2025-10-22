import { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { CandidateTable } from '../../components/tables/CandidateTable';
import { useCandidates } from './hooks/useCandidates';

const DEFAULT_PAGE_SIZE = 10;
const INITIAL_PAGE = 0;

export function CandidatesListPage() {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { rows, loading, error, pageInfo, refetch } = useCandidates({
    page,
    pageSize,
  });

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(INITIAL_PAGE);
  }, []);

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

