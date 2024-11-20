import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;
const token = localStorage.getItem("token");

export const getOccupation = async () => {
  try {
    const response = await axios.get(`${url}/occupations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get occupations:", error);
    throw error;
  }
};

export const getOccupationalGroup = async () => {
  try {
    const response = await axios.get(`${url}/occupational-groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get occupational group:", error);
    throw error;
  }
};

export const getOccupationById = async (id) => {
  try {
    const response = await axios.get(`${url}/occupation/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get occupation by id:", error);
    throw error;
  }
};

export const getOccupationGroupId = async (occupationGroupId) => {
  try {
    const response = await axios.get(`${url}/occupations`, {
      params: {
        "occupational-group-id": occupationGroupId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get occupation group by id:", error);
    throw error;
  }
};
