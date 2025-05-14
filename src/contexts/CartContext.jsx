import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [panier, setPanier] = useState({});

  const ajouter = (id) => {
    setPanier((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const retirer = (id) => {
    setPanier((prev) => {
      const copie = { ...prev };
      if (copie[id] > 1) copie[id] -= 1;
      else delete copie[id];
      return copie;
    });
  };

  const quantite = (id) => panier[id] || 0;

  return (
    <CartContext.Provider value={{ panier, ajouter, retirer, quantite, setPanier }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
