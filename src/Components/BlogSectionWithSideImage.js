import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import ReadMoreText from './ReadMoreText';
import ContainerWrapper from './Common/ContainerWrapper';

export default function BlogSectionWithSideImage({
  headerText,
  descriptionText,
  imageSrc
}) {
  return (
    <ContainerWrapper>
      <Stack gap={{ md: '2rem', xs: '1rem' }} direction={{ md: 'row' }}>
        <div
          className="about-us-description-read-more our-specialities-image"
          style={{ width: '100%' }}
        >
          <img src={imageSrc} style={{ width: '100%' }} loading="lazy"/>
        </div>
        <Box
          className="our-specialities-container"
          style={{ padding: '0', width: '100%' }}
        >
          <div
            className="our-specialities-header"
            style={{ padding: '0', width: '100%' }}
          >
            {headerText}
          </div>
          <div
            className="our-specialities-description"
            style={{ padding: '0' }}
          >
            <ReadMoreText useReadMore={false} limit={350}>
              {descriptionText}
            </ReadMoreText>
          </div>
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}
