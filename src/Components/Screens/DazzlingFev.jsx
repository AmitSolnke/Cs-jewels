import React from 'react';
import prod1 from '../../images/products/1.jpg';
import prod2 from '../../images/products/2.jpg';
import prod3 from '../../images/products/3.jpg';
import prod4 from '../../images/products/4.jpg';
import { Grid, Link } from '@mui/material';

function DazzlingFev() {
  const dazzlingFev = [
    {
      img: prod1,
      link: 'https://csjewels.com/product-catalogues?page=1&metal=1&item_type=14  ',
      name: 'GOLD BANGLES'
    },
    {
      img: prod2,
      link: 'https://csjewels.com/product-catalogues?page=1&metal=1&item_type=28  ',
      name: 'LAYERED BRACELETS'
    },
    {
      img: prod3,
      link: 'https://csjewels.com/product-catalogues?page=1&metal=6&item_type=2  ',
      name: 'DIAMOND NECKLACE'
    },
    {
      img: prod4,
      link: 'https://csjewels.com/product-catalogues?page=1&metal=1&item_type=10 ',
      name: 'KUNDAN NECKLACE'
    }
  ];

  return (
    <Grid
      className="d-flex justify-content-start"
      style={{ width: '100%', gap: '1rem' }}
      container
    >
      {dazzlingFev.map((item, index) => (
        <Grid
          item
          key={index}
          xs={5.5}
          md={2.8}
          lg={2.8}
          sm={5.8}
          sx={{
            width: '100%'
          }}
        >
          <div className="card rounded-0">
            <div className="card-img-container">
              <Link href={`${item.link}`}>
                <img
                  src={item.img}
                  className="card-img rounded-0"
                  alt={item.name}
                />
              </Link>
            </div>
            <div className="card-img">
              <h5 className="card-title px-2 text-center">{item.name}</h5>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default DazzlingFev;
