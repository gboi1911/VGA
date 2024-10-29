import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"; // Gộp lại import
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui"; // Bỏ AnimationRoutes nếu không dùng
import { RecoilRoot } from "recoil";
import HomePage from "../pages/home";
import TestPage from "../pages/test";
import ExpertPage from "../pages/expert";
import User from "../pages/user";
import TestExecute from "../pages/mbtiTest/testExecute";
import TestResult from "../pages/mbtiTest/testResult";
import TestExecuteHolland from "../pages/hollandTest/testExecuteHolland";
import TestResultHolland from "../pages/hollandTest/testResultHolland";
import ExpertDetailPage from "../pages/expertDetail"; // Sửa đường dẫn nếu cần
import RatingMajor from "../pages/hollandTest/ratingMajor"; // Sửa đường dẫn nếu cần
import FilterMajorUniversity from "pages/hollandTest/filterMajorUniversity";
import OccupationDetail from "pages/hollandTest/occupationDetail";
import HeaderBar from "../layout/header"; // Sửa đường dẫn nếu cần
import BottomNavigationPage from "../layout/navigation"; // Sửa đường dẫn nếu cần
import { login } from "../api/login"; // Sửa đường dẫn nếu cần

import CustomBottomNavigation from "super/pages/bottomnavigation";


const MyApp = () => {
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
        console.log(response);
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
        const stId = resposneLogin.data.userId;
        setStudentId(stId);

        const tokenAPI = resposneLogin.data.accessToken;
        localStorage.setItem("token", tokenAPI);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    //   fetchToken();
    // }, []);

    return (
      <RecoilRoot>
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <HeaderBar />
              <AnimationRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path="/expert" element={<ExpertPage />} />
                <Route
                  path="/expertDetail/:id"
                  element={<ExpertDetailPage studentId={studentId} />}
                />
                <Route path="/user" element={<User studentId={studentId} />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/testExecute" element={<TestExecute />} />
                <Route path="/testResult" element={<TestResult />} />
                <Route
                  path="/testExecuteHolland"
                  element={<TestExecuteHolland studentId={studentId} />}
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
              </AnimationRoutes>
              <BottomNavigationPage />
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </RecoilRoot>
    );
  };


  export default MyApp;

