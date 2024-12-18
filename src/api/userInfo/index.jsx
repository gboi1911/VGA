const url = import.meta.env.VITE_APP_BASE_API;
import api from "api/interceptors/api";

import axios from "axios";

let token = localStorage.getItem("token");

export const getStudentInfo = async (id) => {
  try {
    const response = await api.get(`/student/${id}`, {
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
    const response = await api.get(`/high-school/${id}`, {
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
    const response = await api.get(
      `/transactions/?account-id=${accountId}&sort-by-date-time=true&descending=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in getStudentInfo:", error);
    throw error;
  }
};

export const getConsultantInfo = async (id) => {
  try {
    const response = await api.get(`/consultant/${id}`, {
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

export const postWithdrawRequest = async (id, goldAmount) => {
  try {
    const response = await api.post(
      `/transaction/withdraw/${id}?goldAmount=${goldAmount}`,
      { goldAmount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in post request withdraw:", error);
    throw error;
  }
};

export const getGoldBallanceConsultant = async (accountId) => {
  try {
    const response = await api.get(`/wallet/${accountId}`, {
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

export const getNotification = async (accountId) => {
  try {
    const response = await api.get(
      `/notification/account/${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in get notification:", error);
    throw error;
  }
};

export const updateNotificationStatus = async (id, status) => {
  try {
    const response = await api.put(
      `https://vgacareerguidance.id.vn/api/Notification?id=${id}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in updating notification status:", error);
    throw error;
  }
};
