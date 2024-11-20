const url = import.meta.env.VITE_APP_BASE_API;
const token = localStorage.getItem("token");
import axios from "axios";

export const getTimeSlot = async () => {
  try {
    const response = await axios.get(`${url}/timeslots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get time slot:", error);
    throw error;
  }
};
