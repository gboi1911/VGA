import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;

export const getMajor = async () => {
  try {
    const response = await axios.get(`${url}/majors`);
    return response;
  } catch (error) {
    console.log("Error in get majors:", error);
    throw error;
  }
};

export const getMajorCategory = async () => {
  try {
    const response = await axios.get(`${url}/major-categories`);
    return response;
  } catch (error) {
    console.log("Error in get major categories:", error);
    throw error;
  }
};

export const getMajorById = async (id) => {
  try {
    const response = await axios.get(`${url}/major-and-relation/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get major:", error);
    throw error;
  }
};
