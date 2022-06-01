// imports
import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    // footer banner container
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        {/* left side of footer banner */}
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        {/* right side of footer banner */}
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>

        {/* footer image */}
        <img
          src={urlFor(image)}
          className='footer-banner-image'
          alt='product'
        />
      </div>
    </div>
  );
};

export default FooterBanner;
