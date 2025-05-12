import { Box, Stack, useMediaQuery, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { StyledRateTableWrapper } from './style'; // Assuming this is already updated as mentioned earlier
import { getRateDetails } from '../../../services/FrontApp/index.service';

const RateTable = ({setIsRateDataPresent=()=>{}}) => {
  const [rateDetails, setRateDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:767px)');

  const transformRateData = (data) => {
    return data.map((item) => {
      const { updated_at, unit_of_measurement, ...rateData } = item;
      return {
        ...rateData,
        ...(rateData?.rate &&
          unit_of_measurement && {
            rate: `₹ ${rateData?.rate} per 1 ${unit_of_measurement?.toLowerCase()}`
          })
      };
    });
  };

  useEffect(() => {
    const fetchRateDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getRateDetails();
        setRateDetails({
          rateData: transformRateData(response?.data?.data),
          updated_on: response?.data.updated_on
        });
        setIsRateDataPresent(response?.data?.data?.length > 0);
      } catch (error) {
        setRateDetails([]);
        setIsRateDataPresent(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!rateDetails?.rateData) {
      fetchRateDetails();
    }
  }, []);

  const date =
    rateDetails?.updated_on?.trim() &&
    new Date(rateDetails?.updated_on?.trim())?.toISOString()?.split('T')?.[0];

  const time =
    rateDetails?.updated_on?.trim() &&
    new Date(rateDetails?.updated_on?.trim())?.toTimeString().split(' ')[0];

  return (
    <StyledRateTableWrapper
      gap={{ xs: '0.5rem', sm: '0.7rem' }}
      marginY={{ xs: '1rem', sm: '0rem' }}
    >
      {isLoading ? (
        <Box
          width="100%"
          height="10rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          <Stack flexDirection={'row'} width={'100%'}>
            <Box
              width={'100%'}
              textAlign="center"
              fontSize={{ xs: '0.7rem' }}
              textTransform="capitalize"
            >
              Date: {date}
            </Box>
            <Box
              width={'100%'}
              textAlign="center"
              fontSize={{ xs: '0.7rem' }}
              textTransform="capitalize text-wrap"
            >
              Last Updated Time: {time}
            </Box>
          </Stack>
          <Stack gap={{ xs: '0.7rem', sm: '0.9rem' }} width="100%">
            <Stack direction="row" width="100%" gap="0.7rem">
              <Box
                width="100%"
                textAlign="center"
                borderRadius="1rem"
                color="#fdd020"
                fontWeight="bold"
                fontSize={{ xs: '0.75rem', sm: '0.9rem' }}
              >
                <span
                  style={{
                    border: '2px solid #fdd020',
                    borderRadius: '1rem',
                    padding: '0.2rem 1.5rem'
                  }}
                >
                  Material
                </span>
              </Box>
              <Box
                width="100%"
                textAlign="center"
                borderRadius="1rem"
                color="#fdd020"
                fontWeight="bold"
                fontSize={{ xs: '0.75rem', sm: '0.9rem' }}
              >
                <span
                  style={{
                    border: '2px solid #fdd020',
                    borderRadius: '1rem',
                    padding: '0.2rem 2rem'
                  }}
                >
                  Rates
                </span>
              </Box>
            </Stack>
            <Stack
              width="100%"
              gap={{ xs: '0.7rem' }}
              style={{
                height: !isMobile ? '8rem' : '4rem',
                overflowY: 'auto'
              }}
              className="custom-scrollbar"
            >
              {rateDetails?.rateData?.map((rateItem, ind) => (
                <Stack direction="row" key={ind} width="100%" gap="0.7rem">
                  <Box
                    width="100%"
                    textAlign="center"
                    color="#fdd020"
                    className="text-truncate"
                    fontSize={{ xs: '0.75rem', sm: '0.85rem' }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={rateItem?.material_name || '--'}
                  >
                    {rateItem?.material_name || '--'}
                  </Box>
                  <Box
                    width="100%"
                    textAlign="center"
                    color="#fdd020"
                    className="text-truncate"
                    fontSize={{ xs: '0.75rem', sm: '0.85rem' }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={rateItem?.rate || '--'}
                  >
                    {rateItem?.rate || '--'}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </>
      )}
    </StyledRateTableWrapper>
  );
};

export default RateTable;
