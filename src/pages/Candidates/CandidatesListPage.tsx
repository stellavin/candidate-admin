import { useState, useCallback, useEffect, useMemo } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { CandidateTable } from '../../components/tables/CandidateTable';
import { StatusFilterOption } from '../../components/tables/TableToolbar';
import { CandidateDetailPanel } from '../../components/details';
import { useCandidates } from './hooks/useCandidates';
import { useDebounce } from '../../hooks/useDebounce';

const DEFAULT_PAGE_SIZE = 10;
const INITIAL_PAGE = 0;
const DEBOUNCE_DELAY = 300;

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Candidates list page component.
 * Displays a searchable, filterable table of candidates with detail panel.
 * @returns {JSX.Element} Candidates list page with table and filters
 */
export function CandidatesListPage() {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  
  const debouncedSearchTerm = useDebounce(searchValue, DEBOUNCE_DELAY);

  const { rows, loading, error, pageInfo, refetch, allCandidates } = useCandidates({
    page,
    pageSize,
    searchTerm: debouncedSearchTerm,
    statusFilters,
  });

  const availableStatuses = useMemo(() => {
    const uniqueStatuses = new Set<string>();
    
    allCandidates.forEach((candidate) => {
      if (candidate.status) {
        uniqueStatuses.add(candidate.status);
      }
    });

    return Array.from(uniqueStatuses)
      .sort()
      .map((status): StatusFilterOption => ({
        value: status,
        label: capitalizeFirst(status),
      }));
  }, [allCandidates]);

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

  const handleCandidateSelect = useCallback((candidateId: string) => {
    setSelectedCandidateId(candidateId);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedCandidateId(null);
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

      <Grid container spacing={2}>
        <Grid item xs={12} md={selectedCandidateId ? 8 : 12}>
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
            onCandidateSelect={handleCandidateSelect}
            selectedCandidateId={selectedCandidateId}
          />
        </Grid>
        
        {selectedCandidateId && (
          <Grid item xs={12} md={4}>
            <CandidateDetailPanel 
              candidateId={selectedCandidateId}
              onClose={handleCloseDetail}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

