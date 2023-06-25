import { useContext, useState } from "react";

import { MealType, OrderType } from "../../types/types";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import OrderService from "../../services/order-service";
import styles from "./Cart.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

type CartModalType = {
  onClose: () => void;
};

const Cart: React.FC<CartModalType> = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const orderService = OrderService();

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem!(id);
  };

  const cartItemAddHandler = (item: MealType) => {
    cartCtx.addItem!({ ...item, amount: 1 });
  };

  const orderHandler = async () => {
    if (window.confirm("Do you want to place your order?")) {
      setIsLoading(true);

      // Prepare the order
      const newOrder: OrderType = {
        id: Math.random().toString(),
        items: cartCtx.items,
        totalAmount: cartCtx.totalAmount,
        timestamp: new Date(),
      };

      try {
        const result = await orderService.createOrder(newOrder);

        if (!result) {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("Order placed successfully!");
        window.alert("Order placed successfully!");
        cartCtx.clearCart!();
        setIsLoading(false);
        props.onClose();
      }
    }
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
        </div>
      )}
    </Modal>
  );
};

export default Cart;
