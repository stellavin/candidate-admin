import { TableRow, TableCell, Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import styles from './TableError.module.css';

interface TableErrorProps {
  colSpan: number;
  message?: string;
  onRetry?: () => void;
}

export function TableError({ 
  colSpan, 
  message = 'Failed to load data', 
  onRetry 
}: TableErrorProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Box className={styles.container} sx={{ color: 'error.main' }}>
          <ErrorIcon className={styles.icon} />
          <Typography variant="h6" color="error" gutterBottom>
            {message}
          </Typography>
          {onRetry && (
            <Button variant="contained" onClick={onRetry} className={styles.button}>
              Retry
            </Button>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}

