import React, { useRef, useState } from "react";

const SimpleInput: React.FC = (props) => {
  // Ref can be used to get the value of an input field on submit
  const inputNameRef = useRef<HTMLInputElement>(null);

  // State can be used to get the value of an input field on change
  const [enteredName, setEnteredName] = useState<string>("");

  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (enteredName.trim().length === 0) {
      return;
    }

    console.log(enteredName);
    const enteredValue = inputNameRef.current!.value;
    console.log(enteredValue);

    // Reset the input field
    setEnteredName("");
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={inputNameRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
