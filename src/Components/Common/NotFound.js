import {
  Box,
  Typography,
  Stack,
  useTheme,
  Divider,
  Fade,
  Paper
} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export default function NoProductsFound() {
  const theme = useTheme();

  return (
    <Stack width="100%" gap={3} alignItems="center">
      <Divider
        textAlign="center"
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          color: theme.palette.text.primary,
          width: '100%'
        }}
      >
        <span style={{ color: '#e53935' }}>
          {' '}
          <SearchOffIcon
            sx={{ fontSize: '2rem', color: theme.palette.text.disabled }}
          />{' '}
          Results Not Found
        </span>
      </Divider>

      <Fade in timeout={500}>
        <Paper
          elevation={6}
          sx={{
            px: 5,
            py: 6,
            maxWidth: 600,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <Inventory2OutlinedIcon
              sx={{ fontSize: 48, color: theme.palette.text.disabled }}
            />
          </Stack>

          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            gutterBottom
          >
            Oops! No Products Found
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={1}>
            We couldn’t find any products to show at the moment.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            It looks like there's nothing to show here at the moment. Please
            check back soon.
          </Typography>
        </Paper>
      </Fade>
    </Stack>
  );
}
