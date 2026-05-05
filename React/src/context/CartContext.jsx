import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // 🧠 Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🛒 ADD TO CART (SMART + QTY SUPPORT)
  const addToCart = (product) => {
    setCart(prevCart => {
      const exist = prevCart.find(item => item._id === product._id);

      if (exist) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, qty: item.qty + (product.qty || 1) }
            : item
        );
      }

      return [...prevCart, { ...product, qty: product.qty || 1 }];
    });
  };
  // ❌ REMOVE ITEM
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
  };

  // ➕ INCREASE QTY
  const increaseQty = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // ➖ DECREASE QTY
  const decreaseQty = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // 🧹 CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // 💰 TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.Price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🪝 custom hook
export const useCart = () => useContext(CartContext);