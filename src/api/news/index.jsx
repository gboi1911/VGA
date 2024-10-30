import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;

export const getNews = async () => {
  try {
    const response = await axios.get(`${url}/news`);
    return response;
  } catch (error) {
    console.log("Error in get news:", error);
    throw error;
  }
};
