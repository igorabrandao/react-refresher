import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";

const AddUser = () => {
  const [enteredUserData, setEnteredUserData] = useState({
    username: "",
    age: "",
  });

  const usernameChangeHandler = (event) => {
    setEnteredUserData((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };

  const ageChangeHandler = (event) => {
    setEnteredUserData((prevState) => {
      return { ...prevState, age: event.target.value };
    });
  };

  const validateInput = (value) => {
    return value.trim().length !== 0;
  };

  const addUserHandler = (event) => {
    // Prevent the default action of the form
    event.preventDefault();

    // Validate the form data
    if (
      !validateInput(enteredUserData.username) ||
      !validateInput(enteredUserData.age)
    ) {
      return;
    }

    if (+enteredUserData.age < 1) {
      return;
    }

    console.log(enteredUserData);

    // Reset the form
    setEnteredUserData({ username: "", age: "" });
  };

  return (
    <Card className={styles.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={usernameChangeHandler}
          value={enteredUserData.username}
        />
        <label htmlFor="age">Age (Years)</label>
        <input
          id="age"
          type="number"
          onChange={ageChangeHandler}
          value={enteredUserData.age}
        />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
