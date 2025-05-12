import React from 'react';
import RateTable from './RateTable';
import { RateCardText, StyledAnimatedBox, StyledRateBox } from './style';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { useMediaQuery } from '@mui/material';

const RateCard = () => {
  const [showRateCard, setShowRateCard] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:767px)');
  const [isRateDataPresent, setIsRateDataPresent] = React.useState(false);
  const handleMouseEnter = () => {
    if (!isMobile) setShowRateCard(true);
  };

  const handleMouseLeave = () => {
    setShowRateCard(false);
  };

  const toggleRateCard = () => {
    if (isMobile) {
      setShowRateCard((prev) => !prev);
    }
  };

  return (
    <StyledRateBox
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleRateCard}
      visibility={isRateDataPresent ? 'visible' : 'hidden'}
    >
      <RateCardText>Rate Card</RateCardText>
      {isMobile && (
        <CurrencyRupeeOutlinedIcon
          sx={{
            outline: '1.3333333px solid #000',
            borderRadius: '4px',
            width: '1.12em',
            height: '1.121em',
            color: '#000'
          }}
        />
      )}

      <StyledAnimatedBox show={showRateCard}>
        <RateTable setIsRateDataPresent={setIsRateDataPresent}/>
      </StyledAnimatedBox>
    </StyledRateBox>
  );
};

export default RateCard;
