import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decreaseQty, increaseQty, qty, onAdd, setShowCart } =
    useStateContext();

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            {/* selected image */}
            <img
              src={urlFor(image && image[index])}
              className='product-detail-image'
              alt=''
            />
          </div>

          {/* image selection display */}
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)} // allow us to select an image on hover and make visible on bigger display
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>

          {/* reviews */}
          <div className='reviews'>
            {/* stars */}
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            {/* number of reviews */}
            <p>(20)</p>
          </div>

          {/* details */}
          <h4>Details: </h4>
          <p>{details}</p>

          {/* price */}
          <p className='price'>${price}</p>

          {/* quantity */}
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              {/* minus */}
              <span className='minus' onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>

              {/* quantity */}
              <span className='num'>{qty}</span>

              {/* plus */}
              <span className='plus' onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          {/* buttons container */}
          <div className='buttons'>
            {/* add to card btn */}
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>

            {/* buy now btn */}
            <button type='button' className='buy-now'>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* you may like bottom section */}
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        {/* marquee is scrolling part on the bottom */}
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  // just returning the current slug prop
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  // generate paths
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // getting product details from the product page that youre on
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};
export default ProductDetails;
