import redux from "redux";

enum ActionTypeEnum {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
}

type ActionType = {
  type: string;
};

const counterReducer: redux.Reducer = (
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
const store = redux.createStore(counterReducer);

// Subscribers
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// Subscribing to the store
store.subscribe(counterSubscriber);

// Dispatching Actions
store.dispatch({ type: ActionTypeEnum.INCREMENT });
store.dispatch({ type: ActionTypeEnum.DECREMENT });

export default store;
