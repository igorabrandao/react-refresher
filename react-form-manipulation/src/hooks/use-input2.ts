import { useReducer } from "react";

enum InputActionType {
  Input = "INPUT",
  Blur = "BLUR",
  Reset = "RESET",
}

type InputState = {
  value: string;
  isTouched: boolean;
};

type InputAction = {
  type: InputActionType;
  value: string;
};

const initialInputState: InputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case InputActionType.Input:
      return { value: action.value, isTouched: state.isTouched };
    case InputActionType.Blur:
      return { isTouched: true, value: state.value };
    case InputActionType.Reset:
      return { isTouched: false, value: "" };
    default:
      return state;
  }
};

const useInput2 = (validationFn: (value: string) => boolean) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  const inputIsValid = validationFn(inputState.value);
  const hasError = !inputIsValid && inputState.isTouched;

  // Handle the input change, blur, reset event
  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: InputActionType.Input, value: event.target.value });
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: InputActionType.Blur, value: "" });
  };

  const reset = () => {
    dispatch({ type: InputActionType.Reset, value: "" });
  };

  // return the value and the event handlers
  return {
    value: inputState.value,
    isTouched: inputState.isTouched,
    hasError,
    isValid: inputIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput2;
