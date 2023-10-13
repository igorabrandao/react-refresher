import { createStore, Reducer } from "redux";

enum ActionTypeEnum {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
}

type ActionType = {
  type: string;
};

const counterReducer: Reducer = (
  state = { counter: 0 },
  action: ActionType
) => {
  switch (action.type) {
    case ActionTypeEnum.INCREMENT:
      return state.counter + 1;

    case ActionTypeEnum.DECREMENT:
      return state.counter - 1;

    default:
      return state;
  }
};

// Create a Redux store holding the state of the app
const store = createStore(counterReducer);

export default store;
