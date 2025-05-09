import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  RateCardDateWrapper,
  StyledBorderBox,
  StyledRateTableWrapper,
  StyledStack
} from './style';
import DataTable from '../DataTable';
import { getRateDetails } from '../../../services/FrontApp/index.service';

const RateTable = () => {
  const [rateDetails, setRateDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const transformRateData = (data) => {
    return data.map((item) => {
      const { updated_at, unit_of_measurement, ...rateData } = item;
      return {
        ...rateData,
        ...(rateData?.rate &&
          unit_of_measurement && {
            rate: `₹ ${
              rateData?.rate
            } per 1 ${unit_of_measurement?.toLowerCase()}`
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
      } catch (error) {
        setRateDetails([]);
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
    <>
      <StyledRateTableWrapper>
        <Stack
          gap={'0.7rem'}
          marginY={'2rem'}
          sx={{
            maxHeight: '13.4rem',
            overflowY: 'auto'
          }}
        >
          <Stack flexDirection={'row'} width={'100%'}>
            <Box
              width={'100%'}
              textAlign="center"
              fontSize={'0.8rem'}
              textTransform={'capitalize'}
            >
              Date: {date}
            </Box>
            <Box
              width={'100%'}
              textAlign="center"
              fontSize={'0.8rem'}
              textTransform={'capitalize'}
            >
              Last Updated Time: {time}
            </Box>
          </Stack>
          <Stack gap={'0.9rem'} width={'100%'}>
            <Stack direction={'row'} width={'100%'} gap={'0.7rem'}>
              <Box
                width={'100%'}
                textAlign="center"
                borderRadius="1rem"
                border="2px solid #fdd020"
                color="#fdd020"
                fontWeight={'bold'}
              >
                Material
              </Box>
              <Box
                width={'100%'}
                textAlign="center"
                borderRadius="1rem"
                border="2px solid #fdd020"
                color="#fdd020"
                fontWeight={'bold'}
              >
                Rates
              </Box>
            </Stack>
            <Stack width={'100%'} gap={'1rem'}>
              {rateDetails?.rateData?.map((rateIem, ind) => (
                <Stack
                  direction={'row'}
                  key={ind}
                  width={'100%'}
                  gap={'0.7rem'}
                >
                  <Box
                    width={'100%'}
                    textAlign="center"
                    color="#fdd020"
                    className="text-truncate"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={rateIem?.material_name || '--'}
                  >
                    {rateIem?.material_name}
                  </Box>
                  <Box
                    width={'100%'}
                    textAlign="center"
                    color="#fdd020"
                    className="text-truncate"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={rateIem?.rate || '--'}
                  >
                    {rateIem?.rate || '--'}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </StyledRateTableWrapper>
    </>
  );
};

export default RateTable;
