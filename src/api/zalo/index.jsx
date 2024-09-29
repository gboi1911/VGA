// src/api/auth.js
import { getAccessToken } from "zmp-sdk/apis";

export const getDataAccessToken = async () => {
  try {
    const accessToken = await getAccessToken({});
    return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
