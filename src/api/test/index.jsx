const url = import.meta.env.VITE_APP_BASE_API;
import axios from "axios";

export const getTestData = async (id) => {
    try {
        const response = await axios.get(`${url}/personal-test/${id}`);
        return response; 
      } catch (error) {
        console.error('Error in getTestData:', error);
        throw error; 
      }
    };
    

export const postMBTIResult = async (payload) => {
  try {
    const response = await axios.post(`${url}/personal-test-result`, payload);
    return response.data; 
  } catch (error) {
    console.error('Error posting answers:', error);
    if (error.response) {
        console.log('Server responded with:', error.response.status, error.response.data);
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
      } else {
        console.log('Error setting up the request:', error.message);
      }
    throw error;
  }
};

