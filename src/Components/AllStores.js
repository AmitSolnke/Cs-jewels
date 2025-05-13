import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import plusIcon from '../images/icons/plusicon.svg';
import minusIcon from '../images/icons/minusicon.svg';
import { Box, Link, useMediaQuery } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function AllStores({ data, handleAccordionClick }) {
  const [expanded, setExpanded] = React.useState(false);
  const tabView = useMediaQuery('(max-width:900px)');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      className="faqs-container"
      sx={{ height: '25rem', overflowY: 'scroll' }}
    >
      {data.map((element, index) => (
        <Accordion
          expanded={expanded === 'panel' + index}
          onChange={handleChange('panel' + index)}
          key={index}
        >
          <AccordionSummary
            expandIcon={
              expanded === 'panel' + index ? (
                <img src={minusIcon} alt="rightArrowIcon" />
              ) : (
                <img src={plusIcon} alt="rightArrowIcon" />
              )
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            onClick={() =>
              handleAccordionClick({
                lat: parseFloat(element.latitude),
                lng: parseFloat(element.longitude),
                element
              })
            }
          >
            <Typography sx={{ width: '90%', flexShrink: 0 }}>
              <h6 className="store-heading">{element.store_name}</h6>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="find-store-description d-inline find-store-description-text">
              {element.address}
            </Typography>
            {tabView && (
              <Typography>
                <Link
                  onClick={() => {
                    if (tabView) {
                      window.scrollTo({ top: 965, behavior: 'smooth' });
                    }
                  }}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline'
                    },
                    fontSize: '0.9rem',
                    fontWeight: 400
                  }}
                >
                  View Map
                  <ArrowOutwardIcon sx={{ fontSize: '1.2rem' }} />
                </Link>
              </Typography>
            )}

            <Typography className="find-store-description">
              Toll Free No: <p className="toll-free-no">{element.mobile}</p>
            </Typography>
            <Typography className="working-hours-container find-store-description">
              <p>Working Hours: </p>
              <p className="workingHours-text-field">{element.working_hrs}</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
