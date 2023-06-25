import styles from "./Card.module.css";

import { Props } from "../../types/types";

const Card: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
