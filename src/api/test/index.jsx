const url = import.meta.env.VITE_APP_BASE_API;
import axios from "axios";

const token = localStorage.getItem("token");

export const getTestData = async (id) => {
  try {
    const response = await axios.get(`${url}/personal-test/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getTestData:", error);
    throw error;
  }
};

export const postMBTIResult = async (payload) => {
  try {
    const response = await axios.post(`${url}/personal-test-result`, payload);
    return response.data;
  } catch (error) {
    console.error("Error posting answers:", error);
    if (error.response) {
      console.log(
        "Server responded with:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.log("Request made but no response received:", error.request);
    } else {
      console.log("Error setting up the request:", error.message);
    }
    throw error;
  }
};

export const getRatingMajor = async (id) => {
  try {
    const response = await axios.get(`${url}/majors-by-personality/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get data rating major:", error);
    throw error;
  }
};

export const getRegion = async () => {
  try {
    const response = await axios.get(`${url}/regions`);
    return response;
  } catch (error) {
    console.log("Error in get regions: ", error);
    throw error;
  }
};

export const postMajor = async (payload) => {
  try {
    const response = await axios.post(
      `${url}/filter-major-university`,
      payload
    );
    return response;
  } catch (error) {
    console.log("Error in post major:", error);
    throw error;
  }
};

