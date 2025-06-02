import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { set } from 'lodash';

const MobileMenu = ({ navMenu, handleClickOutside }) => {
    const navigate = useNavigate();
    const [expandedMain, setExpandedMain] = useState(null);
    const [expandedMetal, setExpandedMetal] = useState(null);


    const [show, setShow] = useState(true);
    const closeModal = (url, clear) => {
        $('.header-content .close-nav-btns').click(function (e) {
            $('.mobile-menu-overlay').css('width', '0');
        });
        setShow(false);
        if (url) {
            navigate(url);

        }

        if (clear) {
            setExpandedMain(null);
            setExpandedMetal(null);
        }
    };

    const handleMainChange = (panel) => (event, isExpanded) => {
        setExpandedMain(isExpanded ? panel : null);
    };

    const handleMetalChange = (panel) => (event, isExpanded) => {
        setExpandedMetal(isExpanded ? panel : null);
    };

    useEffect(() => {

        document.addEventListener('mousedown', (event) => {
            const isClicked = handleClickOutside(event);
            if (isClicked) {
                setExpandedMain(null);
                setExpandedMetal(null);
                setShow(false);
            }
        });
        return () => {
            document.removeEventListener('mousedown', (event) => {
                handleClickOutside(event);
                setExpandedMain(null);
                setExpandedMetal(null);
                setShow(false);
            });
        };
    }, [show]);


    return <div >
        {
            navMenu?.map((items, index) => (
                <Accordion key={items?.title} expanded={expandedMetal === items.title}
                    onChange={handleMetalChange(items.title)} disableGutters sx={{
                        boxShadow: 'none',
                        border: 'none',
                        '&::before': { display: 'none' }
                    }} slotProps={{ heading: { component: 'h3' } }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#672a2f', }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                            color: '#672a2f',
                            fontSize: '17px',
                            letterSpacing: '2.1px',
                            fontFamily: '"Afacad Flux", serif',
                            textTransform: 'uppercase',
                            fontWeight: 900,
                            lineHeight: '19px',
                            fontStyle: 'normal',
                            fontVariant: 'normal',
                            paddingLeft: "25px",
                            minHeight: '35px'
                        }}
                    >
                        {items?.title}
                    </AccordionSummary>
                    <AccordionDetails sx={{ paddingTop: '0px' }}>

                        {items?.options?.map((item) => (
                            <Accordion sx={{ boxShadow: 'none', border: 'none' }}
                                key={item.id}
                                expanded={expandedMain === item.id}
                                onChange={handleMainChange(item.id)}
                            >
                                <AccordionSummary
                                    className={!item?.children?.length > 0 && 'close-nav-btns'}
                                    onClick={() => closeModal(item?.url, !item?.children?.length > 0 ? 'clear' : '')}
                                    expandIcon={item?.children?.length > 0 && < ExpandMoreIcon sx={{ color: '#672a2f', }} />}
                                    aria-controls={`panel-${item.id}-content`}
                                    id={`panel-${item.id}-header`}
                                    sx={{ color: '#672a2f', }}
                                >

                                    {item?.name}
                                </AccordionSummary>
                                {
                                    item?.children?.length > 0 && <AccordionDetails sx={{ paddingTop: '0px' }}>
                                        <Box
                                            sx={{
                                                fontFamily: '"Afacad Flux", serif',
                                                fontSize: '16px',
                                            }}
                                            display="flex"
                                            flexDirection="column"
                                            gap={1}
                                            pl={1}
                                        >
                                            {item.children?.map((metalItem, index) => (
                                                <div className='close-nav-btns' style={{ color: '#333', textDecoration: 'none' }}
                                                    key={index}
                                                    // to={`/product-catalogues?page=${page}&metal=${item.id}&item_type=${metalItem.id}`}
                                                    onClick={() => closeModal(metalItem?.url, 'clear')}
                                                    underline="hover"
                                                    color="primary"
                                                >
                                                    {metalItem.item_name}
                                                </div>
                                            ))}
                                        </Box>
                                    </AccordionDetails>
                                }
                            </Accordion>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))
        }
    </div>
}

export default MobileMenu;