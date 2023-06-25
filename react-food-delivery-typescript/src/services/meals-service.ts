import axios from "axios";

import { MealType } from "../types/types";

// Firebase API URL
const API_URL = "https://react-http-6205b-default-rtdb.firebaseio.com/";

// Service for manipulate the meals in Firebase
const MealsService = () => {
  // Create axios instance
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const populateMeals = (data: MealType[]) => {
    data.forEach((meal) => {
      axiosInstance.post("/meals.json", meal);
    });
  };

  const getAllMeals = async (): Promise<MealType[]> => {
    return (await axiosInstance.get("/meals.json")).data;
  };

  const getMealById = (id: string) => {
    return axiosInstance.get(`/meals.json/${id}`);
  };

  const createMeal = (data: MealType) => {
    return axiosInstance.post("/meals.json", data);
  };

  const updateMeal = (id: string, data: MealType) => {
    return axiosInstance.put(`/meals.json/${id}`, data);
  };

  const removeMeal = (id: string) => {
    return axiosInstance.delete(`/meals.json/${id}`);
  };

  return {
    populateMeals,
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    removeMeal,
  };
};

export default MealsService;
