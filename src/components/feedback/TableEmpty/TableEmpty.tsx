import { TableRow, TableCell, Box, Typography } from '@mui/material';
import { Inbox } from '@mui/icons-material';
import styles from './TableEmpty.module.css';

interface TableEmptyProps {
  colSpan: number;
  message?: string;
}

export function TableEmpty({ colSpan, message = 'No data available' }: TableEmptyProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Box className={styles.container}>
          <Inbox className={styles.icon} />
          <Typography variant="h6" color="text.secondary">
            {message}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

