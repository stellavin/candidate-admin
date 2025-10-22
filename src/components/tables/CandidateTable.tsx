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
} from '@mui/material';
import { Candidate } from '../../features/candidates/graphql/types';
import { CandidateRow } from './CandidateRow';

const TABLE_COLUMNS = ['First Name', 'Last Name', 'Email', 'Status'] as const;
const COLUMN_COUNT = TABLE_COLUMNS.length;
const ROWS_PER_PAGE_OPTIONS = [10, 25, 50] as const;

/**
 * Props for the CandidateTable component
 */
interface CandidateTableProps {
  /** Array of candidates to display */
  candidates: Candidate[];
  /** Loading state */
  loading: boolean;
  /** Error from query */
  error?: Error;
  /** Current page number (0-based) */
  page: number;
  /** Number of rows per page */
  pageSize: number;
  /** Total count of records */
  totalCount: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange: (pageSize: number) => void;
  /** Optional retry callback for error handling */
  onRetry?: () => void;
}

/**
 * Table component for displaying candidate data with pagination
 * 
 * Features:
 * - Paginated data display
 * - Loading skeletons
 * - Empty state
 * - Responsive design
 */
export function CandidateTable({
  candidates,
  loading,
  page,
  pageSize,
  hasNextPage,
  onPageChange,
  onPageSizeChange,
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
                {candidates.map((candidate) => (
                  <CandidateRow key={candidate.id} candidate={candidate} />
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && candidates.length > 0 && (
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[...ROWS_PER_PAGE_OPTIONS]}
        />
      )}
    </Box>
  );
}

