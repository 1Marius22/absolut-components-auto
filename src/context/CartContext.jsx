/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "absolut_auto_cart_v1";

export function CartProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(data)
        ? data.filter((item) => item.id && item.quantity > 0)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(products));
  }, [products]);

  function addToCart(product, quantity = 1) {
    if (!product || product.stock <= 0) return;
    setProducts((items) => {
      const current = items.find((item) => item.id === product.id);
      const amount = Math.min(
        Number(product.stock),
        (current?.quantity || 0) + Number(quantity),
      );
      return current
        ? items.map((item) =>
            item.id === product.id ? { ...product, quantity: amount } : item,
          )
        : [
            ...items,
            {
              ...product,
              quantity: Math.min(Number(quantity), Number(product.stock)),
            },
          ];
    });
  }

  function updateQuantity(id, quantity) {
    setProducts((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(Number(quantity), Number(item.stock)),
              ),
            }
          : item,
      ),
    );
  }

  function removeProduct(id) {
    setProducts((items) => items.filter((item) => item.id !== id));
  }
  function clearCart() {
    setProducts([]);
  }

  const cartCount = products.reduce((total, p) => total + p.quantity, 0);
  const cartTotal = products.reduce(
    (total, p) => total + Number(p.price) * p.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        updateQuantity,
        removeProduct,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart trebuie folosit în CartProvider.");
  return context;
}
