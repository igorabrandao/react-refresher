import axios from "axios";

import { OrderType } from "../types/types";

// Firebase API URL
const API_URL = "https://react-http-6205b-default-rtdb.firebaseio.com/";

// Service for manipulate the orders in Firebase
const OrdersService = () => {
  // Create axios instance
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const populateOrders = async (data: OrderType[]): Promise<boolean> => {
    try {
      data.forEach((order) => {
        axiosInstance.post("/orders.json", order);
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const getAllOrders = async (): Promise<OrderType[]> => {
    return (await axiosInstance.get("/orders.json")).data;
  };

  const getOrderById = async (id: string): Promise<OrderType> => {
    return (await axiosInstance.get(`/orders.json/${id}`)).data;
  };

  const createOrder = async (data: OrderType): Promise<boolean> => {
    try {
      await axiosInstance.post("/orders.json", data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateOrder = async (id: string, data: OrderType): Promise<boolean> => {
    try {
      await axiosInstance.put(`/orders.json/${id}`, data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const removeOrder = async (id: string): Promise<boolean> => {
    try {
      await axiosInstance.delete(`/orders.json/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    populateOrders,
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    removeOrder,
  };
};

export default OrdersService;
