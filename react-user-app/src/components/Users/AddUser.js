import React, { useState } from "react";

import Wrapper from "../Helpers/Wrapper";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUserData, setEnteredUserData] = useState({
    username: "",
    age: "",
  });
  const [error, setError] = useState();

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
    if (!validateInput(enteredUserData.username)) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name (non-empty values).",
      });
      return;
    }

    if (!validateInput(enteredUserData.age)) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age (non-empty values).",
      });
      return;
    }

    if (+enteredUserData.age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }

    // Pass the form data to the parent component
    props.onAddUser(enteredUserData.username, enteredUserData.age);

    // Reset the form
    setEnteredUserData({ username: "", age: "" });
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={() => setError(null)}
        ></ErrorModal>
      )}
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
    </Wrapper>
  );
};

export default AddUser;
