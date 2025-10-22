import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Clear } from '@mui/icons-material';
import styles from './CandidatesFiltersBar.module.css';

interface CandidatesFiltersBarProps {
  initialFirstName?: string;
  initialLastName?: string;
  onFiltersChange: (filters: { firstName: string; lastName: string }) => void;
  debounceMs?: number;
}

export function CandidatesFiltersBar({
  initialFirstName = '',
  initialLastName = '',
  onFiltersChange,
  debounceMs = 400,
}: CandidatesFiltersBarProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ firstName, lastName });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [firstName, lastName, debounceMs, onFiltersChange]);

  const handleClear = () => {
    setFirstName('');
    setLastName('');
  };

  const hasFilters = firstName || lastName;

  return (
    <Box className={styles.filtersContainer}>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Filter by first name..."
        className={styles.filterField}
      />

      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Filter by last name..."
        className={styles.filterField}
      />

      {hasFilters && (
        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={handleClear}
        >
          Clear Filters
        </Button>
      )}
    </Box>
  );
}

