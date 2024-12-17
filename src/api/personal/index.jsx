import axios from "axios";
import api from "../interceptors/api";

const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");

export const getHistoryTest = async (id) => {
  try {
    const response = await api.get(`/history-user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get history test:", error);
    throw error;
  }
};
