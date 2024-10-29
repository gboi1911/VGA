const url = import.meta.env.VITE_APP_BASE_API;
import axios from "axios";

export const login = async (data) => {
  try {
    const response = await axios.post(`${url}/login-zalo`, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed HTTP methods
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
      },
    });
    const token = response.data.accessToken;
    localStorage.setItem("token", token);
    return response;
  } catch (error) {
    console.error("Error in login: ", error);
    throw error;
  }
};
