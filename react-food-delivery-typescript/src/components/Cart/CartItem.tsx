import { CartItemType } from "../../types/types";
import styles from "./CartItem.module.css";

const CartItem: React.FC<CartItemType> = (props) => {
  const price = `$${props.item.price.toFixed(2)}`;

  return (
    <li className={styles["cart-item"]} key={props.item.id}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove.bind(null, props.item.id)}>−</button>
        <button onClick={props.onAdd.bind(null, props.item)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
