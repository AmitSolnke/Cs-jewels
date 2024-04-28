import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import plusIcon from "../images/icons/plusicon.svg"
import minusIcon from "../images/icons/minusicon.svg"

export default function AllStores({ data }) {
    const [expanded, setExpanded] = React.useState(false);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className='faqs-container'>
            {data.map((element, index) => (
                <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                    <AccordionSummary
                        expandIcon={expanded === 'panel' + index ? <img src={minusIcon} alt="rightArrowIcon" /> : <img src={plusIcon} alt="rightArrowIcon" />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '90%', flexShrink: 0 }}>
                            {element.store_name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='find-store-description find-store-description-text'>
                            {element.address}
                        </Typography>
                        <Typography className='find-store-description'>
                            Toll Free No: {" "}
                            <p className='toll-free-no'>
                                {element.mobile}
                            </p>
                        </Typography>
                        <Typography className='working-hours-container find-store-description'>
                            <p>Working Hours: {" "}</p>
                            <p className='workingHours-text-field'>{element.working_hrs}</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>))}
        </div>
    );
}