import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function ProductBreadcrumb({navigationData}) {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            MUI
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            onClick={handleClick}
        >
            Core
        </Link>,
        <Typography key="3">
            Breadcrumb
        </Typography>,
    ];

    return (
        <Breadcrumbs separator="-" aria-label="breadcrumb" size="lg">
            {navigationData.map( (ele, index) =>(
                <Link className='breadcrumb-element' underline="hover" key={index} color="inherit" href={"/"+ ele.path} onClick={handleClick}>
                {ele.text}
                </Link>
            ))}
        </Breadcrumbs>
    )
}
