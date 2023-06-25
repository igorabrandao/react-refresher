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
      const meals = await mealsService.getAllMeals();

      if (meals) {
        setMealsList(meals);
      }
    } catch (error) {
      console.error(error);
    }
  }, [mealsService]);

  // Load the meals when the component is mounted
  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  return (
    <section className={styles.meals}>
      <Card>
        {mealsList &&
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
