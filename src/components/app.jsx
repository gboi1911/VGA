import axios from "axios";
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
import NewDetail from "super/section/news/newsdetail";
import Explore from "pages/explore/explore";
import MBTITest from "pages/explore/mbti";
import HollandTest from "pages/explore/holland";
import Major from "pages/explore/major";
import Majorbycategory from "pages/explore/majorbycategory";
import MajorDetail from "pages/explore/majorDetail";
import Occupation from "pages/explore/occupation";
import Occupationbygroup from "pages/explore/occupationbygroup";
import University from "pages/explore/university";
import UniversityDetail from "pages/explore/universityDetail";
import Personal from "pages/explore/personal";
import PersonalOccupation from "pages/explore/personalOccupation";
import Personality from "pages/explore/personality";
import ConsultantSchedulePage from "super/pages/ConsultantSchedulePage";
import News from "pages/news/news";
import ConsultantPage from "super/pages/consultantpage";

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
  const [userid, setUserId] = useState("65767ae4-20f8-40a5-8c15-08dcf72eff8e");
  const [role, setRole] = useState(2);
  const [accountid, setAccountId] = useState();
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
  //       const accountid = resposneLogin.data.accountId;
  //       setRole(role);
  //       setUserId(userid);
  //       setAccountId(accountid);

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
                  <Route path="/news" element={<News />} />
                  <Route path="/newsdetail/:id" element={<NewDetail />} />
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/expert"
                    element={<ExpertPage studentId={userid} />}
                  />
                  <Route
                    path="/expertDetail/:id"
                    element={<ExpertDetailPage studentId={userid} />}
                  />
                  <Route
                    path="/user"
                    element={<User studentId={userid} accountId={accountid} />}
                  />
                  <Route path="/test" element={<TestPage />} />
                  <Route
                    path="/testExecute"
                    element={
                      <TestExecute studentId={userid} accountId={accountid} />
                    }
                  />
                  <Route path="/testResult" element={<TestResult />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/mbtiTest" element={<MBTITest />} />
                  <Route path="/hollandTest" element={<HollandTest />} />
                  <Route path="/major" element={<Major />} />
                  <Route path="/major/:id" element={<Majorbycategory />} />
                  <Route path="/majorDetail/:id" element={<MajorDetail />} />
                  <Route path="/occupation" element={<Occupation />} />
                  <Route path='/occupation/:id' element={<Occupationbygroup />} />
                  <Route path="/university" element={<University />} />
                  <Route
                    path="/universityDetail/:id"
                    element={<UniversityDetail />}
                  />
                  <Route path="/personal" element={<Personal />} />
                  <Route
                    path="/personalOccupation"
                    element={<PersonalOccupation studentId={userid} />}
                  />
                  <Route
                    path="/personality"
                    element={<Personality studentId={userid} />}
                  />
                  <Route
                    path="/testExecuteHolland"
                    element={
                      <TestExecuteHolland
                        studentId={userid}
                        accountId={accountid}
                      />
                    }
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
              {role === 4 && (
                <>
                  <Route path="/consultantpage" element={<ConsultantPage consultantId={userid} accountId={accountid} />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/newsdetail/:id" element={<NewDetail />} />
                </>

              )}
            </Routes>
            {role === 4 ? (
              <>
                <CustomBottomNavigation userid={userid} />
              </>
            ) : (
              <BottomNavigationPage />
            )}
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;
