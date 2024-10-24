import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages/home";
import TestPage from "../pages/test";
import ExpertPage from "../pages/expert";
import User from "../pages/user";
import TestExecute from "../pages/mbtiTest/testExecute";
import TestResult from "../pages/mbtiTest/testResult";
import TestExecuteHolland from "../pages/hollandTest/testExecuteHolland";
import TestResultHolland from "../pages/hollandTest/testResultHolland";
import ExpertDetailPage from "pages/expertDetail";
import RatingMajor from "pages/hollandTest/ratingMajor";
import HeaderBar from "layout/header";
import BottomNavigationPage from "layout/navigation";
import axios from "axios";

import {
  getDataAccessToken,
  authorizeUser,
  getPhoneNumberUser,
  getUserIDUser,
  getUser,
} from "api/zalo";

import { login } from "api/login";

const MyApp = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getDataAccessToken();
        const phoneNumber = await getPhoneNumberUser();

        var config = {
          method: "get",
          url: "https://graph.zalo.me/v2.0/me/info",
          headers: {
            access_token: token,
            code: phoneNumber.token,
            secret_key: "P5DXS5UHWG7M73DkCLRC",
          },
        };

        var response = await axios(config);
        const phone = response.data.data.number;
        const userId = await getUserIDUser();
        const userInfo1 = await getUser();

        setAccessToken(token); // Store the token once fetched

        const resposneLogin = await login({
          zaloId: userId,
          phone: phone,
          image_Url: "string",
        });
        console.log(resposneLogin);
        const stId = resposneLogin.data.studentId;
        setStudentId(stId);

        const tokenAPI = resposneLogin.data.accessToken;
        localStorage.setItem("token", tokenAPI);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  console.log(studentId);

  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <HeaderBar />
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="expert" element={<ExpertPage />} />
              <Route path="expertDetail/:id" element={<ExpertDetailPage />} />
              <Route path="/user" element={<User studentId={studentId} />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/testExecute" element={<TestExecute />} />
              <Route path="/testResult" element={<TestResult />} />
              <Route
                path="/testExecuteHolland"
                element={<TestExecuteHolland studentId={studentId} />}
              />
              <Route path="/ratingMajor" element={<RatingMajor />} />
              <Route path="testResultHolland" element={<TestResultHolland />} />
            </AnimationRoutes>
            <BottomNavigationPage />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;
