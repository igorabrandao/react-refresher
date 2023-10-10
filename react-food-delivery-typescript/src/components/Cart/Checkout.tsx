import { useContext } from "react";

import CartContext from "../../store/cart-context";
import OrderService from "../../services/order-service";

import styles from "./Checkout.module.css";

type CheckoutType = {
  onCancel: () => void;
};

const Checkout: React.FC<CheckoutType> = (props) => {
  const cartCtx = useContext(CartContext);
  const orderService = OrderService();

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (window.confirm("Do you want to place your order?")) {
      //   setIsLoading(true);
      //   // Prepare the order
      //   const newOrder: OrderType = {
      //     id: Math.random().toString(),
      //     items: cartCtx.items,
      //     totalAmount: cartCtx.totalAmount,
      //     timestamp: new Date(),
      //   };
      //   try {
      //     const result = await orderService.createOrder(newOrder);
      //     if (!result) {
      //       throw new Error("Something went wrong!");
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   } finally {
      //     console.log("Order placed successfully!");
      //     window.alert("Order placed successfully!");
      //     cartCtx.clearCart!();
      //     setIsLoading(false);
      //     props.onClose();
      //   }
    }
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name"></input>
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street"></input>
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal"></input>
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city"></input>
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button className={styles.actions} onClick={() => {}}>
        Confirm
      </button>
    </form>
  );
};

export default Checkout;
