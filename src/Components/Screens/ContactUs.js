import { Box, Checkbox, Grid, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react'
import SectionTitleWithArrows from '../SectionTitleWithArrows';
import rightArrowIcon from '../../images/icons/right-arrow.svg';
import useWindowWidthAndHeight from '../../utilities/CustomHooks';
import FAQs from '../FAQs';
import { contactUs } from '../../services/FrontApp/index.service';
import ErrorList from '../Common/ErrorList';
import SuccessMsg from '../Common/SuccessMsg';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ContactUs() {
    const [errors, setErrors] = useState([])
    const [successMsg, setSuccessMsg] = useState('')
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        description: '',
    });
    const handleChange = ({ target }) => {
        data[target.name] = target.value
        const temp = Object.assign({}, data)
        setData(temp)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors([])
        setSuccessMsg('')
        try {
            const result = await contactUs(data);
            setSuccessMsg(result.data.message)
        } catch (error) {
            setErrors(error.response.data.message)
        }

    };
    const windoDimensions = useWindowWidthAndHeight();
    return (
        <div className='contact-us'>
            <div className="contact-us-container">
                <div className='contact-us-center' >
                    <SectionTitleWithArrows textMessage={"Need assistance?"} arrowSides={"Both"} />
                    <div className='contact-us-description'>
                        Send an email to &nbsp;<div className='decoration-contact-us-underline'>care@csjewellers.com</div> &nbsp;or call us on &nbsp; <div className='decoration-contact-us-underline'> 1800 267 0999 </div>&nbsp;anytime! We will get back to you as soon as we can!
                    </div>
                </div>
                <div className='contact-us-center'>
                    <ErrorList errors={errors} />
                    <SuccessMsg message={successMsg} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div className='contact-us-one-line-form-field'>
                            <TextField className='text-field text-field-name-contact-us' required id="outlined-basic" label="First Name" variant="outlined" name="first_name" value={data.first_name} onChange={handleChange} />
                            <TextField className='text-field text-field-name-contact-us' required id="outlined-basic" label="Last Name" variant="outlined" name="last_name" value={data.last_name} onChange={handleChange} />
                        </div>
                        <div className='contact-us-one-line-form-field'>
                            <TextField fullWidth className='text-field text-field-email-contact-us' required id="outlined-basic" label="Email" variant="outlined" name="email" value={data.email} onChange={handleChange} />
                        </div>
                        <div className='contact-us-one-line-form-field'>
                            <TextField fullWidth className='text-field text-field-email-contact-us' required id="outlined-basic" label="Mobile" variant="outlined" name="mobile" value={data.mobile} onChange={handleChange} />
                        </div>
                        <div className='contact-us-one-line-form-field'>
                            <TextField multiline rows={4} className='text-field text-field-email-contact-us' required id="outlined-basic" label="What would you like us to assist you with?*" variant="outlined" name="description" value={data.description} onChange={handleChange} />
                        </div>
                        <div className='contact-us-one-line-form-field term-and-condition-section'>
                            <div className='checkbox-contact-us-page'>
                                <Checkbox />
                            </div>
                            <div className='checkbox-contact-us-page-text'>
                                *I have read and accepted the&nbsp;<div className='decoration-contact-us-underline'>terms and conditions</div>&nbsp;and&nbsp;<div className='decoration-contact-us-underline'> privacy policy </div>
                            </div>
                        </div>
                        <div className='contact-us-one-line-form-field'>
                            <button type="button" className="carousel-explore-now-btn" onClick={handleSubmit}>
                                SUBMIT
                                {' '}
                                <img src={rightArrowIcon} alt="rightArrowIcon" />
                            </button>
                        </div>
                    </Box>
                </div>
            </div>
            <div className='contact-us-center'>
                <SectionTitleWithArrows textMessage={"FAQs"} arrowSides={"Both"} />
            </div>
            <FAQs />
        </div>
    )
}
