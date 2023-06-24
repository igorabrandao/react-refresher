import React, { useEffect, useRef, useState } from "react";

const SimpleInput: React.FC = (props) => {
  // Ref can be used to get the value of an input field on submit
  const inputNameRef = useRef<HTMLInputElement>(null);

  // State can be used to get the value of an input field on change
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState<boolean>(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name input is valid!");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);

    if (enteredName.trim().length === 0) {
      setEnteredNameIsValid(false);
      return;
    }
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim().length === 0) {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);
    const enteredValue = inputNameRef.current!.value;
    console.log(enteredValue);

    // Reset the input field
    setEnteredName("");
  };

  const nameInputIsInvalid: boolean = !enteredNameIsValid && enteredNameTouched;
  const nameInputClasses: string = nameInputIsInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div
        className={nameInputClasses}
      >
        <label htmlFor="name">Your Name</label>
        <input
          ref={inputNameRef}
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
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
