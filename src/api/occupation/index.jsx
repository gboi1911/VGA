import axios from "axios";
import api from "../interceptors/api";

const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");

export const getOccupation = async () => {
  try {
    const response = await api.get(`/occupations`, {
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

export const getOccupationalGroup = async (searchValue) => {
  try {
    const response = await api.get(`/occupational-groups`, {
      params: {
        name: searchValue,
      },
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

export const getOccupationById = async (id, studentId) => {
  try {
    const response = await api.get(
      `occupation/${id}?studentId=${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in get occupation by id:", error);
    throw error;
  }
};

export const getOccupationGroupId = async (occupationGroupId, searchValue) => {
  try {
    const response = await api.get(`/occupations`, {
      params: {
        "occupational-group-id": occupationGroupId,
        name: searchValue,
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
