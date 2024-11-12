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

export const getDay = async (id) => {
  try {
    const response = await axios.get(`${url}/consultation-days`, {
      params: { "consultant-id": id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching consultation days:", error);
    throw error;
  }
};

export const postBook = async (studId, timeId) => {
  try {
    const response = await axios.post(`${url}/bookings`, null, {
      params: {
        consultationTimeId: timeId,
        studentId: studId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in booking consultation days:", error);
    throw error;
  }
};

export const getBooking = async (stuId) => {
  try {
    const response = await axios.get(`${url}/bookings`, {
      params: {
        "student-id": stuId,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get bookings:", error);
    throw error;
  }
};

export const getExpertById = async (id) => {
  try {
    const response = await axios.get(`${url}/consultant/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get major by id:", error);
    throw error;
  }
};

export const getTimebyId = async (id) => {
  try {
    const response = await axios.get(`${url}/consultation-time/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get time by id:", error);
    throw error;
  }
};

export const getBookingConsultant = async (constId, day) => {
  try {
    const response = await axios.get(`${url}/bookings`, {
      params: {
        "consultant-id": constId,
        "day-in-week": day,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get bookings of consultant:", error);
    throw error;
  }
};
