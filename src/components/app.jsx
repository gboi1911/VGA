import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import FilterMajorUniversity from "pages/hollandTest/filterMajorUniversity";
import OccupationDetail from "pages/hollandTest/occupationDetail";
import HeaderBar from "layout/header";
import BottomNavigationPage from "layout/navigation";
import CustomBottomNavigation from "super/pages/bottomnavigation";
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
  const [userid, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const token = await getDataAccessToken();
  //       const phoneNumber = await getPhoneNumberUser();

  //       var config = {
  //         method: "get",
  //         url: "https://graph.zalo.me/v2.0/me/info",
  //         headers: {
  //           access_token: token,
  //           code: phoneNumber.token,
  //           secret_key: "P5DXS5UHWG7M73DkCLRC",
  //         },
  //       };

  //       var response = await axios(config);
  //       console.log(response);
  //       const phone = response.data.data.number;
  //       const userId = await getUserIDUser();
  //       const userInfo1 = await getUser();

  //       setAccessToken(token); // Store the token once fetched

  //       const resposneLogin = await login({
  //         zaloId: userId,
  //         phone: phone,
  //         image_Url: "string",
  //       });
  //       console.log(resposneLogin);
  //       const userid = resposneLogin.data.userId;
  //       const role = resposneLogin.data.role;
  //       setRole(role);
  //       setUserId(userid);

  //       const tokenAPI = resposneLogin.data.accessToken;
  //       localStorage.setItem("token", tokenAPI);
  //     } catch (error) {
  //       console.error("Error fetching token:", error);
  //     }
  //   };

  //   fetchToken();
  // }, []);

  console.log("userid", userid);
  console.log("role", role);

  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <HeaderBar />
            <Routes>
              {role === 2 && (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/expert" element={<ExpertPage />} />
                  <Route
                    path="/expertDetail/:id"
                    element={<ExpertDetailPage studentId={userid} />}
                  />
                  <Route path="/user" element={<User studentId={userid} />} />
                  <Route path="/test" element={<TestPage />} />
                  <Route path="/testExecute" element={<TestExecute />} />
                  <Route path="/testResult" element={<TestResult />} />
                  <Route
                    path="/testExecuteHolland"
                    element={<TestExecuteHolland studentId={userid} />}
                  />
                  <Route path="/ratingMajor" element={<RatingMajor />} />
                  <Route
                    path="/filterMajorUniversity"
                    element={<FilterMajorUniversity />}
                  />
                  <Route
                    path="/testResultHolland"
                    element={<TestResultHolland />}
                  />
                  <Route
                    path="/occupationDetail/:id"
                    element={<OccupationDetail />}
                  />
                </>
              )}
            </Routes>
            {role === 4 ? <CustomBottomNavigation userid={userid} /> : <BottomNavigationPage />}
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;