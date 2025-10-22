import { TableFooter as MuiTableFooter, TableRow, TablePagination } from '@mui/material';

interface TableFooterProps {
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowsPerPageOptions?: readonly number[];
  colSpan: number;
}

export function TableFooter({
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50],
  colSpan,
}: TableFooterProps) {
  // Calculate total pages
  const totalPages = totalCount === -1 ? '...' : Math.max(1, Math.ceil(totalCount / rowsPerPage));
  const currentPage = page + 1; // Convert 0-based to 1-based

  return (
    <MuiTableFooter>
      <TableRow>
        <TablePagination
          colSpan={colSpan}
          count={totalCount}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[...rowsPerPageOptions]}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={() => `Page ${currentPage} of ${totalPages}`}
          sx={{
            borderBottom: 'none',
            width: '100%',
            '& .MuiTablePagination-toolbar': {
              justifyContent: 'space-between',
              paddingLeft: 2,
              paddingRight: 2,
              minHeight: 52,
            },
            '& .MuiTablePagination-spacer': {
              display: 'none',
            },
            '& .MuiTablePagination-selectLabel': {
              margin: 0,
            },
            '& .MuiTablePagination-select': {
              marginLeft: 1,
              marginRight: 0,
            },
            '& .MuiTablePagination-displayedRows': {
              marginLeft: 'auto',
              marginRight: 2,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            },
            '& .MuiTablePagination-actions': {
              marginLeft: 2,
              flexShrink: 0,
            },
          }}
        />
      </TableRow>
    </MuiTableFooter>
  );
}

