import { useRef, useState } from "react";

import { CheckoutDataType } from "../../types/types";
import styles from "./Checkout.module.css";

type CheckoutType = {
  onConfirm: (data: CheckoutDataType) => void;
  onCancel: () => void;
};

const isEmpty = (value: string) => value.trim() === "";
const isExpectedSize = (value: string, expectedSize: number) =>
  value.trim().length === expectedSize;

const Checkout: React.FC<CheckoutType> = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const confirmHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (window.confirm("Do you want to place your order?")) {
      // Get the order data
      const enteredName = nameInputRef.current!.value;
      const enteredStreet = streetInputRef.current!.value;
      const enteredPostal = postalInputRef.current!.value;
      const enteredCity = cityInputRef.current!.value;

      setFormInputsValidity({
        name: !isEmpty(enteredName),
        street: !isEmpty(enteredStreet),
        postal: isExpectedSize(enteredPostal, 8),
        city: !isEmpty(enteredCity),
      });

      if (!enteredName || !enteredStreet || !enteredPostal || !enteredCity) {
        window.alert("Please fill the order data!");
        return;
      }

      if (!isExpectedSize(enteredPostal, 8)) {
        window.alert("Please enter a valid postal code!");
        return;
      }

      // Submit cart data
      props.onConfirm({
        enteredName,
        enteredStreet,
        enteredPostal,
        enteredCity,
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div
        className={`${styles.control} ${
          formInputsValidity.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputsValidity.street ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputsValidity.postal ? "" : styles.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef}></input>
        {!formInputsValidity.postal && <p>Please enter a valid postal code!</p>}
      </div>
      <div
        className={`${styles.control} ${
          formInputsValidity.city ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
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
