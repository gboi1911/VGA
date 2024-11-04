import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;

export const getOccupation = async () => {
  try {
    const response = await axios.get(`${url}/occupations`);
    return response;
  } catch (error) {
    console.log("Error in get occupations:", error);
    throw error;
  }
};

export const getOccupationalGroup = async () => {
  try {
    const response = await axios.get(`${url}/occupational-groups`);
    return response;
  } catch (error) {
    console.log("Error in get occupational group:", error);
    throw error;
  }
};

export const getOccupationById = async (id) => {
  try {
    const response = await axios.get(`${url}/occupation/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get occupation by id:", error);
    throw error;
  }
};
