import React, { useRef, useState } from "react";

const SimpleInput: React.FC = (props) => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [enteredName, setEnteredName] = useState<string>("");

  const nameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

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
