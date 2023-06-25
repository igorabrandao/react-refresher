import { useContext } from "react";

import CardtContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import { MealType } from "../../types/types";

type CartModalType = {
  onClose: () => void;
};

const Cart: React.FC<CartModalType> = (props) => {
  const cartCtx = useContext(CardtContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem!(id);
  };

  const cartItemAddHandler = (item: MealType) => {
    cartCtx.addItem!({ ...item, amount: 1 });
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
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
