import axios from "axios";
import api from "../interceptors/api";

const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");

export const getNews = async (searchValue) => {
  try {
    const response = await api.get(`/news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        tilte: searchValue,  // Passing searchValue as 'title' query param
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
    const response = await api.get(`/news/${id}`, {
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
