import axios from "axios";

const url = import.meta.env.VITE_APP_BASE_API;
let token = localStorage.getItem("token");

export const getNews = async ({ searchValue }) => {
  try {
    // Tạo đối tượng params, nếu có title thì thêm vào
    const params = {};
    if (searchValue) {
      params.tilte = searchValue; // Sử dụng 'tilte' thay vì 'title'
    }

    const response = await axios.get(`${url}/news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params, // Truyền đối tượng params vào request
    });
    return response;
  } catch (error) {
    console.log("Error in get news:", error);
    throw error;
  }
};

export const getNewsDetail = async (id) => {
  try {
    const response = await axios.get(`${url}/news/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in get news:", error);
    throw error;
  }
};
