import React from "react";

import styles from "./Input.module.css";

type Props = {
  className?: string;
  label: string;
  input: React.HTMLProps<HTMLInputElement>;
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
