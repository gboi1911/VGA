import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;
const token = localStorage.getItem("token");

export const getUniversity = async () => {
  try {
    const response = await axios.get(`${url}/universities`, {
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
    const response = await axios.get(`${url}/university/${id}`, {
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
    const response = await axios.get(`${url}/region/${id}`, {
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
