import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;
const token = localStorage.getItem("token");

export const getMajor = async () => {
  try {
    const response = await axios.get(`${url}/majors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get majors:", error);
    throw error;
  }
};

export const getMajorCategory = async () => {
  try {
    const response = await axios.get(`${url}/major-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get major categories:", error);
    throw error;
  }
};

export const getMajorById = async (id) => {
  try {
    const response = await axios.get(`${url}/major-and-relation/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get major:", error);
    throw error;
  }
};

export const getMajorCategoryId = async (majorCategoryId) => {
  try {
    const response = await axios.get(`${url}/majors`, {
      params: {
        "major-category-id": majorCategoryId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get majors:", error);
    throw error;
  }
};
