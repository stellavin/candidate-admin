import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Skeleton,
  Typography,
} from '@mui/material';
import { Candidate } from '../../features/candidates/graphql/types';
import { CandidateRow } from './CandidateRow';
import { TableToolbar, StatusFilterOption } from './TableToolbar';
import { TableFooter } from './TableFooter';

const TABLE_COLUMNS = ['#', 'First Name', 'Last Name', 'Email', 'Status', 'Actions'] as const;
const COLUMN_COUNT = TABLE_COLUMNS.length;
const ROWS_PER_PAGE_OPTIONS = [10, 25, 50] as const;

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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  statusFilters?: string[];
  onStatusFiltersChange?: (filters: string[]) => void;
  availableStatuses?: StatusFilterOption[];
  onCandidateSelect?: (candidateId: string) => void;
  selectedCandidateId?: string | null;
  allCandidatesCount?: number;
}

/**
 * Candidate table component with search, filtering, and pagination.
 * Displays a list of candidates in a table format with interactive features.
 * @param {CandidateTableProps} props - Component props
 * @returns {JSX.Element} Candidate table with toolbar and pagination
 */
export function CandidateTable({
  candidates,
  loading,
  page,
  pageSize,
  hasNextPage,
  onPageChange,
  onPageSizeChange,
  searchValue = '',
  onSearchChange,
  statusFilters = [],
  onStatusFiltersChange,
  availableStatuses = [],
  onCandidateSelect,
  selectedCandidateId,
  allCandidatesCount,
}: CandidateTableProps) {
  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    onPageSizeChange(newPageSize);
  };

  const totalCount = hasNextPage ? -1 : page * pageSize + candidates.length;

  return (
    <Box>
      <TableContainer component={Paper}>
        <TableToolbar 
          title=""
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder="Search by first or last name..."
          statusFilters={statusFilters}
          onStatusFiltersChange={onStatusFiltersChange}
          availableStatuses={availableStatuses}
          totalCount={allCandidatesCount}
        />
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <>
                {Array.from({ length: pageSize }, (_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {Array.from({ length: COLUMN_COUNT }, (_, cellIndex) => (
                      <TableCell key={`cell-${cellIndex}`}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
            
            {!loading && candidates.length === 0 && (
              <TableRow>
                <TableCell colSpan={COLUMN_COUNT} align="center" sx={{ py: 6 }}>
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
            
            {!loading && candidates.length > 0 && (
              <>
                {candidates.map((candidate, index) => (
                  <CandidateRow 
                    key={candidate.id} 
                    candidate={candidate}
                    rowNumber={page * pageSize + index + 1}
                    onSelect={onCandidateSelect}
                    isSelected={selectedCandidateId === candidate.id}
                  />
                ))}
              </>
            )}
          </TableBody>
          
          {!loading && candidates.length > 0 && (
            <TableFooter
              page={page}
              rowsPerPage={pageSize}
              totalCount={totalCount}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              colSpan={COLUMN_COUNT}
            />
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}

