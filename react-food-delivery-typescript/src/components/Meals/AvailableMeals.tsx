import { useEffect, useState, useCallback } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { MealType } from "../../types/types";
import MealsService from "../../services/meals-service";
import styles from "./AvailableMeals.module.css";

const AvailableMeals: React.FC = () => {
  const [mealsList, setMealsList] = useState<MealType[]>([]);
  const mealsService = MealsService();
  
  // Function to load the meals from Firebase
  const loadMeals = useCallback(async () => {
    try {
      const data = await mealsService.getAllMeals();

      if (!data) {
        throw new Error("Something went wrong!");
      }

      const loadedMeals: MealType[] = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
          amount: data[key].amount,
        });
      }

      setMealsList(loadedMeals);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Load the meals when the component is mounted
  useEffect(() => {
    console.log("Loading meals...");
    loadMeals();
  }, [loadMeals]);

  return (
    <section className={styles.meals}>
      <Card>
        {mealsList.length > 0 &&
          mealsList.map((meal) => {
            return (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                amount={0}
              />
            );
          })}
        {mealsList.length === 0 && (
          <p className={styles["not-found"]}>No meals found.</p>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
