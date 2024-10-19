import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;
const MAX_RETRIES = 3;

export const getExpert = async (retries = 0) => {
  try {
    const { data } = await axios.get(`${url}/consultants`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed HTTP methods
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
      },
    });
    return data;
  } catch (error) {
    console.error("Error in getConsultants:", error);

    // Check if we have retries left
    if (retries < MAX_RETRIES) {
      console.log(`Retrying... Attempt ${retries + 1}`);
      return getExpert(retries + 1); // Retry the API call
    } else {
      throw error; // Throw error after maximum retries
    }
  }
};
