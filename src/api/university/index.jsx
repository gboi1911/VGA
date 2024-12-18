import axios from "axios";
import api from "../interceptors/api";
const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");

export const getUniversity = async () => {
  try {
    const response = await api.get(`/universities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get universities:", error);
    throw error;
  }
};

export const getUniversityById = async (id) => {
  try {
    const response = await api.get(`/university/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get university by id:", error);
    throw error;
  }
};

export const getRegionById = async (id) => {
  try {
    const response = await api.get(`/region/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get region by id: ", error);
    throw error;
  }
};
