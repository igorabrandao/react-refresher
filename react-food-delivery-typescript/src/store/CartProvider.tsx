import { useReducer } from "react";

import CartContext from "./cart-context";
import { Props, MealType, CartType } from "../types/types";

enum ActionTypeEnum {
  ADD = "ADD",
  REMOVE = "REMOVE",
}

type ActionType = {
  type: string;
  item?: MealType;
  id?: string;
};

const defaultCartState: CartType = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: CartType, action: ActionType) => {
  if (action.type === ActionTypeEnum.ADD) {
    // Calculate the new total amount
    const updatedTotalAmount =
      state.totalAmount + action.item!.price * action.item!.amount;

    // Check if the item already exists in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item!.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // If the item already exists, update the amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item!.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item!);
    }

    // Return the updated state
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === ActionTypeEnum.REMOVE) {
    // Check if the item already exists in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

/*
 * Note that the PropsWithChildren type is omitted from the props type of a FunctionalComponent after React 18,
 * this means that you have to include the children prop yourself:
 */
const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: MealType) => {
    dispatchCartAction({ type: ActionTypeEnum.ADD, item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: ActionTypeEnum.REMOVE, id: id });
  };

  const contextValue: CartType = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
