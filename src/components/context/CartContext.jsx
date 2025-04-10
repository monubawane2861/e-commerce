import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// Custom hook for accessing cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add or update item in cart
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        return updated;
      }

      return [...prev, { ...product, quantity }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);

    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  // Calculate total cart value (with discount)
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice =
        item.price * (1 - (item.discountPercentage || 0) / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  // Count total number of items
  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Context value
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
