import * as React from 'react';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ImageSliderCardHome({width, height, CardImage, padding, CardImageType, name}) {
  const navigation = useNavigate()
  return (
    <div className={ "" +CardImageType + "-item-section image-slide-card-container"}>
      <img width={width} height={height}  src={`${CardImage}`} />
      { padding ==0 && <Divider variant="middle" />}
      <p className={ padding ==0  ? "image-slider-card-text no-border": "image-slider-card-text"}>
        {name}
      </p>
    </div>
  );
}
