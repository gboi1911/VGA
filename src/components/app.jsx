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
import HeaderBar from "../layout/header"; // Sửa đường dẫn nếu cần
import BottomNavigationPage from "../layout/navigation"; // Sửa đường dẫn nếu cần
import { login } from "../api/login"; // Sửa đường dẫn nếu cần

import CustomBottomNavigation from "super/pages/bottomnavigation";


const MyApp = () => {
  const [studentId, setStudentId] = useState(null);

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const responseLogin = await login({
  //         zaloId: "",
  //         phone: "8437707045",
  //         image_Url: "string",
  //       });

  //       if (responseLogin?.data) {
  //         const stId = responseLogin.data.userId;
  //         setStudentId(stId);
  //         const tokenAPI = responseLogin.data.accessToken;
  //         localStorage.setItem("token", tokenAPI);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching token:", error);
  //     }
  //   };

  //   fetchToken();
  // }, []);

  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <HeaderBar />
            <CustomBottomNavigation />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;

{/* <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="expert" element={<ExpertPage />} />
  <Route path="expertDetail/:id" element={<ExpertDetailPage />} />
  <Route path="/user" element={<User studentId={studentId} />} />
  <Route path="/test" element={<TestPage />} />
  <Route path="/testExecute" element={<TestExecute />} />
  <Route path="/testResult" element={<TestResult />} />
  <Route path="/testExecuteHolland" element={<TestExecuteHolland studentId={studentId} />} />
  <Route path="/ratingMajor" element={<RatingMajor />} />
  <Route path="testResultHolland" element={<TestResultHolland />} />
</Routes> */}
{/* <BottomNavigationPage /> */ }