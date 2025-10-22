import { TableRow, TableCell, Skeleton } from '@mui/material';
import styles from './TableSkeleton.module.css';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className={styles.row}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex} className={styles.cell}>
              <Skeleton variant="text" className={styles.skeleton} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

