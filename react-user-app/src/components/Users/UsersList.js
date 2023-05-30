import React from "react";
import styles from "./UsersList.module.css";

const UsesList = (props) => {
  return (
    <div className={styles.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsesList;
