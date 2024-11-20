const url = import.meta.env.VITE_APP_BASE_API;
const token = localStorage.getItem("token");
import axios from "axios";

export const getStudentInfo = async (id) => {
  try {
    const response = await axios.get(`${url}/student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getStudentInfo:", error);
    throw error;
  }
};

export const getSchoolName = async (id) => {
  try {
    const response = await axios.get(`${url}/high-school/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getSchoolName:", error);
    throw error;
  }
};

export const getTransaction = async (accountId) => {
  try {
    const response = await axios.get(`${url}/transactions/`, {
      params: {
        accountId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getStudentInfo:", error);
    throw error;
  }
};
export const getConsultantInfo = async (id) => {
  try {
    const response = await axios.get(`${url}/consultant/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getConsultantInfo:", error);
    throw error;
  }
};
