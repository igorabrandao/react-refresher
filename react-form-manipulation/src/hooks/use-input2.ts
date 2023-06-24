import { useState } from "react";

const useInput2 = (validationFn: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  
  const inputIsValid = validationFn(enteredValue);
  const hasError = !inputIsValid && isTouched;

  // Handle the input change, blur, reset event
  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  // return the value and the event handlers
  return {
    value: enteredValue,
    isTouched,
    hasError,
    isValid: inputIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput2;
