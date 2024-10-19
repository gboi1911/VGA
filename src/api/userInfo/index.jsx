const url = import.meta.env.VITE_APP_BASE_API;
import axios from "axios";

export const getStudentInfo = async (id) => {
  try {
    const response = await axios.get(`${url}/student/${id}`, {});
    return response;
  } catch (error) {
    console.error("Error in getStudentInfo:", error);
    throw error;
  }
};

export const getSchoolName = async (id) => {
  try {
    const response = await axios.get(`${url}/high-school/${id}`, {});
    return response;
  } catch (error) {
    console.error("Error in getSchoolName:", error);
    throw error;
  }
};
