import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");

export const getHistoryTest = async (id) => {
  try {
    const response = await axios.get(`${url}/history-user/${id}`, {
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
