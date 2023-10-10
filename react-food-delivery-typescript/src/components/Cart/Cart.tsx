import { useContext, useState } from "react";

import { MealType } from "../../types/types";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import Checkout from "./Checkout";

type CartModalType = {
  onClose: () => void;
};

const Cart: React.FC<CartModalType> = (props) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem!(id);
  };

  const cartItemAddHandler = (item: MealType) => {
    cartCtx.addItem!({ ...item, amount: 1 });
  };

  const orderHandler = async () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            onRemove={cartItemRemoveHandler}
            onAdd={cartItemAddHandler}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div>
          {cartItems}
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && <Checkout onCancel={props.onClose} />}
          {!isCheckout && (
            <div className={styles.actions}>
              <button className={styles["button--alt"]} onClick={props.onClose}>
                Close
              </button>
              {hasItems && (
                <button className={styles.button} onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
