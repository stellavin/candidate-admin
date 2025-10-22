import { Box, Typography, Button, Container } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * 404 Not Found page component.
 * Displays when a user navigates to a non-existent route.
 * @returns {JSX.Element} 404 error page with navigation options
 */
export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '4rem', md: '6rem' },
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate('/candidates')}
          >
            Go to Candidates
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

