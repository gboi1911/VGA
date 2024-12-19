// src/api/auth.js
import {
  getAccessToken,
  authorize,
  getPhoneNumber,
  getUserID,
  getUserInfo,
} from "zmp-sdk/apis";

export const getDataAccessToken = async () => {
  try {
    const accessToken = await getAccessToken({});
    return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const authorizeUser = async () => {
  try {
    const data = await authorize({
      scopes: ["scope.userPhonenumber", "scope.userInfo"],
    });
    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const getPhoneNumberUser = async () => {
  try {
    const data = await getPhoneNumber();

    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const getUserIDUser = async () => {
  try {
    const data = await getUserID();
    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export const getUser = async (request) => {
  try {
    const data = await getUserInfo({
      params: { autoRequestPermission: request },
    });
    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
