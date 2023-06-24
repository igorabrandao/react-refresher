import React, { useState } from "react";

const SimpleInput: React.FC = (props) => {
  // State can be used to get the value of an input field on change
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);

  const enteredNameIsValid = enteredName.trim().length !== 0;
  const nameInputIsInvalid: boolean = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

  const nameInputClasses: string = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    // Reset the input field
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
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
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
