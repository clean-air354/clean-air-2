import { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : null}
      {cart.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <p>${item.price}</p>
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
