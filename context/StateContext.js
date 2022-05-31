import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //   handle increase quantity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //   handle decrease quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      // cant go lower than 1
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  //   handle add to cart
  const onAdd = (product, quantity) => {
    // check if product is already in cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    // if product exists, increase quantity instead
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  return (
    //   wrap everything with context provider
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// allows us to use our state like a hook
export const useStateContext = () => useContext(Context);
