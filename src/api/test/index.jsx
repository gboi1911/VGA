const url = import.meta.env.VITE_APP_BASE_API;
import axios from "axios";

const token = localStorage.getItem("token");

export const getTestData = async (id, accountId) => {
  try {
    const response = await axios.get(`${url}/personal-test/${id}`, {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4OGNjNTNhNC03YmMxLTQ0NzItODVjYS0xODQ4MjcwZDEwZGUiLCJlbWFpbCI6Im5nb3Zhbmh1bmdAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3R1ZGVudCIsInVuaXF1ZV9uYW1lIjoiNTZlMTJkZWEtZjVmNy00OTQ2LTgyNGMtMDQzZTliZjI4NGUwIiwicGhvbmVfbnVtYmVyIjoiODQ5MTgxMDc4NDMiLCJTdHVkZW50SWQiOiJiYmM4ZDBmMC1kYWZhLTQzMjktOThlOS1iM2FlYjdlZTA3ZTkiLCJuYmYiOjE3MzE1NzQyMTYsImV4cCI6MTczMTY2NDIxNiwiaXNzIjoidmdhLXN5c3RlbS1pc3N1ZXIifQ.HinaagFnyBLh_x7CkvPgxongxMB766wYpjQZHvuWW_c"}`,
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
    const response = await axios.post(`${url}/personal-test-result`, payload);
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
    const response = await axios.get(`${url}/majors-by-personality/${id}`);
    return response;
  } catch (error) {
    console.log("Error in get data rating major:", error);
    throw error;
  }
};

export const getRegion = async () => {
  try {
    const response = await axios.get(`${url}/regions`);
    return response;
  } catch (error) {
    console.log("Error in get regions: ", error);
    throw error;
  }
};

export const postMajor = async (payload) => {
  try {
    const response = await axios.post(
      `${url}/filter-major-university`,
      payload
    );
    return response;
  } catch (error) {
    console.log("Error in post major:", error);
    throw error;
  }
};

export const getAdmissionMethod = async () => {
  try {
    const response = await axios.get(`${url}/admission-methods`);
    return response;
  } catch (error) {
    console.log("Error in get admission methods: ", error);
    throw error;
  }
};

export const getTestType = async () => {
  try {
    const response = await axios.get(`${url}/test-types`);
    return response;
  } catch (error) {
    console.error("Error in get test types: ", error);
    throw error;
  }
};
