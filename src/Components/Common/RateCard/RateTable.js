import { Box } from '@mui/material';
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
  const [rateDetails, setRateDetails] = useState(null);

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
        const response = await getRateDetails();
        setRateDetails({
          rateData: transformRateData(response?.data?.data),
          updated_on: response?.data.updated_on
        });
      } catch (error) {
        setRateDetails(null);
      }
    };

    if (!rateDetails?.rateData) {
      fetchRateDetails();
    }
  }, []);

  const date = rateDetails?.updated_on?.trim()
    ? new Date(rateDetails?.updated_on?.trim())?.toISOString()?.split('T')?.[0]
    : new Date()?.toISOString()?.split('T')?.[0];

  const time =
    rateDetails?.updated_on?.trim() &&
    new Date(rateDetails?.updated_on?.trim())?.toTimeString().split(' ')[0];

  return (
    <>
      {rateDetails?.rateData?.length > 0 && (
        <StyledRateTableWrapper>
          <StyledBorderBox>
            <StyledStack>
              <RateCardDateWrapper>
                <strong className="text-truncate text-capitalize">Updated On: {date} </strong>
                <Box className="text-truncate">{time}</Box>
              </RateCardDateWrapper>
              <DataTable data={rateDetails?.rateData} />
            </StyledStack>
          </StyledBorderBox>
        </StyledRateTableWrapper>
      )}
    </>
  );
};

export default RateTable;
