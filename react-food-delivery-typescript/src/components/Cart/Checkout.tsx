import { useContext, useRef } from "react";

import CartContext from "../../store/cart-context";
import OrderService from "../../services/order-service";
import { MealType, OrderType } from "../../types/types";

import styles from "./Checkout.module.css";

type CheckoutType = {
  onCancel: () => void;
  onDisplayLoading: () => void;
  onHideLoading: () => void;
};

const isExpectedSize = (value: string, expectedSize: number) => value.trim().length === expectedSize;

const Checkout: React.FC<CheckoutType> = (props) => {
  const cartCtx = useContext(CartContext);
  const orderService = OrderService();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (window.confirm("Do you want to place your order?")) {
      // Get the order data
      const enteredName = nameInputRef.current!.value;
      const enteredStreet = streetInputRef.current!.value;
      const enteredPostal = postalInputRef.current!.value;
      const enteredCity = cityInputRef.current!.value;

      if (!enteredName || !enteredStreet || !enteredPostal || !enteredCity) {
        window.alert("Please fill the order data!");
        return;
      }

      if (!isExpectedSize(enteredPostal, 8)) {
        window.alert("Please enter a valid postal code!");
        return;
      }

      props.onDisplayLoading();
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
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef}></input>
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
