const url = import.meta.env.VITE_APP_BASE_API;
import axios from "axios";
import api from "../interceptors/api";

let token = localStorage.getItem("token");

export const getTestData = async (id, accountId) => {
  try {
    const response = await api.get(`/personal-test/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
        accountId,
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
    const response = await api.post(`/personal-test-result`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const response = await api.get(`/majors-by-personality/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get data rating major:", error);
    throw error;
  }
};

export const getRegion = async () => {
  try {
    const response = await api.get(`/regions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get regions: ", error);
    throw error;
  }
};

export const postMajor = async (payload) => {
  try {
    const response = await api.post(
      `/filter-major-university`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in post major:", error);
    throw error;
  }
};

export const getAdmissionMethod = async () => {
  try {
    const response = await api.get(`/admission-methods`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get admission methods: ", error);
    throw error;
  }
};

export const getTestType = async (id) => {
  try {
    const response = await api.get(`test-type/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in get test types: ", error);
    throw error;
  }
};

export const getTestList = async () => {
  try {
    const response = await api.get(`/personal-tests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in get test list: ", error);
    throw error;
  }
};
