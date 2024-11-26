import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");

export const getNews = async () => {
  try {
    const response = await axios.get(`${url}/news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get news:", error);
    throw error;
  }
};

export const getNewsDetail = async (id) => {
  try {
    const response = await axios.get(`${url}/news/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get news:", error);
    throw error;
  }
};
