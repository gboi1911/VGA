import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");

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

export const getMajorCategory = async (searchValue) => {
  try {
    const response = await axios.get(`${url}/major-categories`, {
      params: {
        name: searchValue,
      },
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

export const getMajorById = async (id, studentId) => {
  try {
    const response = await axios.get(
      `${url}/major-and-relation/${id}?studentId=${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in get major:", error);
    throw error;
  }
};

export const getMajorCategoryId = async (majorCategoryId, searchValue) => {
  try {
    const response = await axios.get(`${url}/majors`, {
      params: {
        "major-category-id": majorCategoryId,
        name: searchValue,
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

export const postStudentCare = async (payload) => {
  try {
    const response = await axios.post(`${url}/student-care`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in post student care:", error);
    throw error;
  }
};

export const getListCare = async (studentId) => {
  try {
    const response = await axios.get(`${url}/student-care/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get list care:", error);
    throw error;
  }
};
