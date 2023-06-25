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

  const populateMeals = async (data: MealType[]): Promise<boolean> => {
    try {
      data.forEach((meal) => {
        axiosInstance.post("/meals.json", meal);
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const getAllMeals = async (): Promise<MealType[]> => {
    return (await axiosInstance.get("/meals.json")).data;
  };

  const getMealById = async (id: string): Promise<MealType> => {
    return (await axiosInstance.get(`/meals.json/${id}`)).data;
  };

  const createMeal = async (data: MealType): Promise<boolean> => {
    try {
      await axiosInstance.post("/meals.json", data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateMeal = async (id: string, data: MealType): Promise<boolean> => {
    try {
      await axiosInstance.put(`/meals.json/${id}`, data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const removeMeal = async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/meals.json/${id}`);
      return true;
    } catch (error) {
      return false;
    }
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
