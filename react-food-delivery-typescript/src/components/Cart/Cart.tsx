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

  const orderService = OrderService();
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const displayLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

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
    setIsLoading(true);

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
      window.alert("Order placed successfully!");
      cartCtx.clearCart!();
      setIsLoading(false);
      props.onClose();
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
        </div>
      )}
    </Modal>
  );
};

export default Cart;
