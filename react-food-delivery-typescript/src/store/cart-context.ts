import React from "react";

import { CartType } from "../types/types";

const CartContext = React.createContext<CartType>({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
