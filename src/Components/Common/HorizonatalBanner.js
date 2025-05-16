import { Box, Stack, Typography } from '@mui/material';

const HorizonatalBanner = ({ imageSrc, title, desc }) => {
  return (
    <Stack
      alignItems={'center'}
      direction={'row'}
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent={'center'}
      gap={'2rem'}
    >
      <Box maxWidth={'24rem'}>
        <img
          src={imageSrc}
          alt="GoldenEra"
          style={{ height: '100%', width: '100%' }}
        />
      </Box>
      <Stack alignItems={'center'} gap={'1rem'} >
        <Typography color='#672A2F' fontWeight={600} fontSize={{ xs: '1rem', sm: '1.2rem' }} textAlign={'center'}>{title}</Typography>
        <Typography
          px={2}
          py={1}
          textAlign={'center'}
          color={'#fff'}
          sx={{
            background: '#672A2F'
          }}
          fontSize={{ xs: '0.8rem', sm: '1rem' }}
        >
          {desc}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default HorizonatalBanner;
