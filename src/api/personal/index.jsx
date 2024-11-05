import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;

export const getHistoryTest = async (id) => {
  try {
    const response = await axios.get(`${url}/history-user/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get history test:", error);
    throw error;
  }
};
