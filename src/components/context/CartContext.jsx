import React, { createContext, useContext, useEffect, useState } from "react";

// Step 1: Create Cart Context
const CartContext = createContext();

// Step 2: Custom hook to use Cart Context
export const useCart = () => useContext(CartContext);

// Step 3: Cart Provider Component
export const CartProvider = ({ children }) => {
  // Cart state with data from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, quantity }];
    });
  };

  // Remove product from cart//delete
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update quantity of product in cart .when we have 0  so dont do any thing but we have card and then want again this so they will increase
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  // Calculate total cart price with discount
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const discount = item.discountPercentage || 0;
      const finalPrice = item.price * (1 - discount / 100);
      return total + finalPrice * item.quantity;
    }, 0);
  };

  // Total item count in cart
  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Step 4: Provide all functions and data to children
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
