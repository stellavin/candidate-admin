import { useState, useCallback, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { CandidateTable } from '../../components/tables/CandidateTable';
import { StatusFilterOption } from '../../components/tables/TableToolbar';
import { useCandidates } from './hooks/useCandidates';
import { useDebounce } from '../../hooks/useDebounce';

const DEFAULT_PAGE_SIZE = 10;
const INITIAL_PAGE = 0;
const DEBOUNCE_DELAY = 300; // 300ms debounce delay

/**
 * Capitalizes the first letter of a string
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function CandidatesListPage() {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  
  // Debounce the search term to reduce unnecessary filtering
  const debouncedSearchTerm = useDebounce(searchValue, DEBOUNCE_DELAY);

  const { rows, loading, error, pageInfo, refetch, allCandidates } = useCandidates({
    page,
    pageSize,
    searchTerm: debouncedSearchTerm,
    statusFilters,
  });

  // Extract unique statuses from the API data
  const availableStatuses = useMemo(() => {
    const uniqueStatuses = new Set<string>();
    
    allCandidates.forEach((candidate) => {
      if (candidate.status) {
        uniqueStatuses.add(candidate.status);
      }
    });

    // Convert to array and sort alphabetically
    return Array.from(uniqueStatuses)
      .sort()
      .map((status): StatusFilterOption => ({
        value: status,
        label: capitalizeFirst(status),
      }));
  }, [allCandidates]);

  // Reset to first page when search term or filters change
  useEffect(() => {
    setPage(INITIAL_PAGE);
  }, [debouncedSearchTerm, statusFilters]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(INITIAL_PAGE);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleStatusFiltersChange = useCallback((filters: string[]) => {
    setStatusFilters(filters);
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
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        statusFilters={statusFilters}
        onStatusFiltersChange={handleStatusFiltersChange}
        availableStatuses={availableStatuses}
      />
    </Box>
  );
}

