import { Box, Stack, Typography } from '@mui/material';

const HorizonatalBanner = ({ imageSrc, title, desc, subtitle = null }) => {
  return (
    <Stack
      alignItems={'center'}
      direction={'row'}
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent={'center'}
      gap={{ xs: '1rem', sm: '2rem' }}
    >
      <Box maxWidth={'24rem'}>
        <img
          src={imageSrc}
          alt="GoldenEra"
          style={{ height: '100%', width: '100%' }}
        />
      </Box>
      <Stack alignItems={'center'} gap={subtitle ? '0.5rem' : '1rem'}>
        <Typography
          color="#672A2F"
          fontWeight={600}
          fontSize={{ xs: '1rem', sm: '1.2rem' }}
          textAlign={'center'}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            color="#672A2F"
            fontWeight={600}
            textAlign={'center'}
            fontSize={{ xs: '0.8rem', sm: '1rem' }}
          >
            {subtitle}
          </Typography>
        )}
        <Typography
          px={4}
          py={1}
          textAlign={'center'}
          color={'#fff'}
          sx={{
            background: '#672A2F',
            borderRadius: '4px'
          }}
          fontSize={{ xs: '0.8rem', sm: '1rem' }}
          my={'0.3rem'}
        >
          {desc}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default HorizonatalBanner;