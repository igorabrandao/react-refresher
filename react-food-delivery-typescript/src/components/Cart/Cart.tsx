import { useContext, useState } from "react";

import { MealType, OrderType, CheckoutDataType } from "../../types/types";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import Checkout from "./Checkout";
import OrderService from "../../services/order-service";

type CartModalType = {
  onClose: () => void;
};

const Cart: React.FC<CartModalType> = (props) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const orderService = OrderService();
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem!(id);
  };

  const cartItemAddHandler = (item: MealType) => {
    cartCtx.addItem!({ ...item, amount: 1 });
  };

  const orderHandler = async () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (checkoutData: CheckoutDataType) => {
    // Prepare the order
    setIsSubmitting(true);

    const newOrder: OrderType = {
      id: Math.random().toString(),
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
      name: checkoutData.enteredName,
      street: checkoutData.enteredStreet,
      postal: checkoutData.enteredPostal,
      city: checkoutData.enteredCity,
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
      cartCtx.clearCart!();

      // Update the cart states
      setIsSubmitting(false);
      setDidSubmit(true);
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

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
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
    </>
  );

  const isSubmittingModalContent = (
    <>
      <LoadingSpinner />
      <p className={styles.message}>Sending order data...</p>
    </>
  );

  const didSubmitModalContent = (
    <>
      <p>Order placed successfully!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
