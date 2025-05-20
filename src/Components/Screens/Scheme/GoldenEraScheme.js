import { Box, Button, Container, Stack, Typography } from '@mui/material';
import {
  BookYourGold,
  GoldenEra,
  GoldenEraLogo,
  InvestingInGold,
  MoreFeatures
} from '../../../images/SchemeImages';
import { handleDownload } from '../../../utilities/handleDownload';
import HorizonatalBanner from '../../Common/HorizonatalBanner';

const GoldenEraScheme = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Stack gap={2} sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <img
            src={GoldenEra}
            alt="GoldenEra"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Box>
          <Stack gap={2}>
            <Box marginInline={'auto'}>
              <Typography
                fontWeight={600}
                fontSize={{ xs: '1rem', sm: '2rem' }}
              >
                More Gold, More Gains-GES!
              </Typography>
            </Box>
            <img
              src={InvestingInGold}
              alt="InvestingInGold"
              style={{ width: '100%', height: '100%' }}
            />
            <Box marginInline={'auto'}>
              <Button
                variant="contained"
                onClick={() =>
                  handleDownload('/Brouchures/GoldenEra.pdf', 'GoldenEra.pdf')
                }
                sx={{
                  backgroundColor: '#672A2F',
                  '&:hover': {
                    backgroundColor: '#5b2429'
                  }
                }}
              >
                Download Brochure
              </Button>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ width: '100%', height: '100%' }}>
          <img
            src={MoreFeatures}
            alt="MoreFeatures"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Box sx={{ width: '100%', height: '100%' }}>
          <HorizonatalBanner
            imageSrc={GoldenEraLogo}
            title={'Book Your Gold Every Month'}
            subtitle={'for additional benefits!'}
            desc={'To Enroll Now Connect our Representative On 07969991827'}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default GoldenEraScheme;
