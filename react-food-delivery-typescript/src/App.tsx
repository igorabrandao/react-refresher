import { useCallback, useEffect, useState } from "react";

import DUMMY_MEALS from "./mock/dummy-meals";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import MealsService from "./services/meals-service";

function App() {
  const FIRST_RUN = false;
  const [cartIsShown, setCartIsShown] = useState<boolean>(false);
  const mealsService = MealsService();

  // Populate the meals in Firebase
  const populateMeals = useCallback(async () => {
    try {
      const result = await mealsService.populateMeals(DUMMY_MEALS);

      if (result) {
        console.log("Meals populated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  }, [mealsService]);

  useEffect(() => {
    if (FIRST_RUN) {
      populateMeals();
    }
  }, [FIRST_RUN, populateMeals]);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
