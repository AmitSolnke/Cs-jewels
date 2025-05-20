import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import plusIcon from "../images/icons/plusicon.svg"
import minusIcon from "../images/icons/minusicon.svg"
import { getFaqs } from '../services/FrontApp/index.service';
import { parseHtmlContent } from '../utilities/CustomFunction';

export default function FAQs() {
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const result = await getFaqs();
            console.log(result.data.data)
            setData(result.data.data)
          } catch (error) {
            console.error(error.message)
          }
    }

    useEffect(() => {
        getData()
    }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


    return (
        <div className='faqs-container'>
            {data.map((element, index) => (
                <Accordion key={index} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                    <AccordionSummary
                        expandIcon={expanded === 'panel' + index ? <img src={minusIcon} alt="rightArrowIcon" loading="lazy"/> : <img src={plusIcon} alt="rightArrowIcon" loading="lazy"/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '90%', flexShrink: 0 }}>
                           <h6 className='faqs-question'>{element.question}</h6>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography >
                            <div className='faqs-ans'>
                            <div
                                // dangerouslySetInnerHTML={{ __html: element.answers}}
                            >
                                {parseHtmlContent(element.answers)}
                            </div>

                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>))}
        </div>
    );
}
