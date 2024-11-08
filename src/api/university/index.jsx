import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;

export const getUniversity = async () => {
  try {
    const response = await axios.get(`${url}/universities`);
    return response;
  } catch (error) {
    console.log("Error in get universities:", error);
    throw error;
  }
};

export const getUniversityById = async (id) => {
  try {
    const response = await axios.get(`${url}/university/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get university by id:", error);
    throw error;
  }
};

export const getRegionById = async (id) => {
  try {
    const response = await axios.get(`${url}/region/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get region by id: ", error);
    throw error;
  }
};