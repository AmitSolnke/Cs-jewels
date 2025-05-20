import { Box, Button, Container, Stack, Typography } from '@mui/material';
import {
  EarnBigger,
  GoldenDreamLogo,
  GoldenDreams,
  InvestLittle,
  RateImage,
  SchemeApplicable
} from '../../../images/SchemeImages';
import { handleDownload } from '../../../utilities/handleDownload';
import { useNavigate } from 'react-router-dom';
import { GDPButton } from './style';
const GoldenDreamPlanScheme = () => {

  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Stack gap={2} sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <img
            src={GoldenDreams}
            alt="GoldenDreams"
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
                SAVE BIG, EARN BIGGER!
              </Typography>
            </Box>
            <img
              src={EarnBigger}
              alt="EarnBigger"
              style={{ width: '100%', height: '100%' }}
            />
            <Box marginInline={'auto'}>
              <Button
                variant="contained"
                onClick={() =>
                  handleDownload(
                    '/Brouchures/GoldenDreamPlan.pdf',
                    'GoldenDreamPlan.pdf'
                  )
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
          <Stack gap={1}>
            <img
              src={RateImage}
              alt="RateImage"
              style={{ width: '100%', height: '100%' }}
            />
            <img
              src={SchemeApplicable}
              alt="SchemeApplicable"
              style={{ width: '100%', height: '100%' }}
            />
          </Stack>
        </Box>
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
          <img
            src={InvestLittle}
            alt="InvestLittle"
            style={{ width: '100%', height: '100%' }}
          />
          <GDPButton
            variant="contained"
            onClick={() => navigate('/')}
          >
            Enroll Now
          </GDPButton>
        </Box>
      </Stack>
    </Container>
  );
};

export default GoldenDreamPlanScheme;
