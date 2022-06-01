// imports
import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  // state context
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className='navbar-container'>
      {/* logo */}
      <p className='logo'>
        <Link href='/'>NK Headphones</Link>
      </p>

      {/* cart icon */}
      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {/* cart component */}
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
