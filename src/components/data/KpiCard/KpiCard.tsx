import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { ReactNode } from 'react';
import styles from './KpiCard.module.css';

interface KpiCardProps {
  title: string;
  value: string | number;
  delta?: number;
  icon?: ReactNode;
}

export function KpiCard({ title, value, delta, icon }: KpiCardProps) {
  const DeltaIcon = delta && delta > 0 ? TrendingUp : TrendingDown;
  const deltaClass = delta && delta > 0 ? styles.positive : styles.negative;

  return (
    <Card className={styles.card}>
      <CardContent>
        <Box className={styles.header}>
          <Typography variant="body2" color="text.secondary" className={styles.title}>
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: 'primary.main' }}>
              {icon}
            </Box>
          )}
        </Box>

        <Typography variant="h4" component="div" gutterBottom className={styles.value}>
          {value}
        </Typography>

        {delta !== undefined && delta !== 0 && (
          <Box className={`${styles.delta} ${deltaClass}`}>
            <DeltaIcon className={styles.deltaIcon} />
            <Typography variant="body2">
              {Math.abs(delta)}% from last period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

