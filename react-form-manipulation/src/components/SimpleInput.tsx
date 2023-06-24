import React, { useState } from "react";

import { validateEmail } from "../helpers/validation";

const SimpleInput: React.FC = (props) => {
  // State can be used to get the value of an input field on change
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);
  const enteredNameIsValid = enteredName.trim().length !== 0;
  const nameInputIsInvalid: boolean = !enteredNameIsValid && enteredNameTouched;

  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredEmailTouched, setEnteredEmailTouched] =
    useState<boolean>(false);
  const enteredEmailIsValid =
    enteredEmail.trim().length !== 0 && validateEmail(enteredEmail);
  const emailInputIsInvalid: boolean =
    !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    // Reset the input field
    setEnteredName("");
    setEnteredNameTouched(false);

    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div
        className={nameInputIsInvalid ? "form-control invalid" : "form-control"}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div
        className={
          emailInputIsInvalid ? "form-control invalid" : "form-control"
        }
      >
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email must be valid.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
