const url = import.meta.env.VITE_APP_BASE_API;
const token = localStorage.getItem("token");
import axios from "axios";

export const getStudentInfo = async (id) => {
  try {
    const response = await axios.get(`${url}/student/${id}`, {
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
    const response = await axios.get(`${url}/high-school/${id}`, {
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
    const response = await axios.get(
      `${url}/transactions/?account_id=${accountId}&sort-by-date-time=true&descending=true`,
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
    const response = await axios.get(`${url}/consultant/${id}`, {
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
    const response = await axios.post(
      `${url}/transaction/withdraw/${id}?goldAmount=${goldAmount}`,
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
    const response = await axios.get(`${url}/wallet/${accountId}`, {
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
