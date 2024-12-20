const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");
import api from "../interceptors/api";
import axios from "axios";

export const getTimeSlot = async () => {
  try {
    const response = await api.get(`/timeslots`, {
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

export const createSchedule = async (formData) => {
  try {
    const response = await api.post(`/consultation-days`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in create schedule:", error);
    throw error;
  }
};
export const createComment = async ({ formDataComment, id }) => {
  try {
    const response = await api.put(`/booking/${id}`, formDataComment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in create comment:", error);
    throw error;
  }
};

export const deleteTimeSlot = async (idConsultantTime) => {
  try {
    const response = await api.delete(
      `/consultation-time/${idConsultantTime}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in delete time slot:", error);
    throw error;
  }
};
