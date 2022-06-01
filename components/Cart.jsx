// imports
import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        {/* arrow icon btn */}
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {/* if cart is empty */}
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                className='btn'
                type='button'
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* cart items container */}
        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item._id}>
                {/* cart item image */}
                <img
                  src={urlFor(item?.image[0])}
                  className='cart-product-image'
                />

                {/* item description */}
                <div className='item-desc'>
                  {/* top container with name and price */}
                  <div className='flex top'>
                    {/* item name */}
                    <h5>{item.name}</h5>
                    {/* item price */}
                    <h4>${item.price}</h4>
                  </div>

                  {/* bottom container for quantity */}
                  <div className='flex bottom'>
                    <div>
                      {/* minus/plus/quantity container */}
                      <p className='quantity-desc'>
                        {/* minus */}
                        <span
                          className='minus'
                          onClick={() =>
                            toggleCartItemQuantity(item._id, 'decrement')
                          }
                        >
                          <AiOutlineMinus />
                        </span>

                        {/* item quantity */}
                        <span className='num' onClick=''>
                          {item.quantity}
                        </span>

                        {/* plus */}
                        <span
                          className='plus'
                          onClick={() =>
                            toggleCartItemQuantity(item._id, 'increment')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>

                    {/* remove button */}
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline onClick={() => onRemove(item)} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>

            {/* pay btn */}
            <div className='btn-container'>
              <button type='button' className='btn'>
                Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
