import axios from "axios";
import React, { useEffect, useState, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages/home";
import TestPage from "../pages/test";
import ExpertPage from "../pages/expert";
import AllExpert from "pages/allexpert";
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
// react lazy
// const Occupation = React.lazy(() => import("pages/explore/occupation"));
import Occupationbygroup from "pages/explore/occupationbygroup";
import University from "pages/explore/university";
// react lazy
// const University = React.lazy(() => import("pages/explore/university"));
import UniversityDetail from "pages/explore/universityDetail";
import Personal from "pages/explore/personal";
import PersonalOccupation from "pages/explore/personalOccupation";
import Personality from "pages/explore/personality";
import ConsultantSchedulePage from "super/pages/ConsultantSchedulePage";
import News from "pages/news/news";
import ConsultantPage from "super/pages/consultantpage";
import Notification from "pages/notification";
import MBTI from "pages/explore/mbtiList";
import Holland from "pages/explore/hollandList";
import Transaction from "pages/transaction";
import MajorCareList from "pages/explore/majorCareList";
import OccupationCareList from "pages/explore/occupationCareList";
import UserInfo from "pages/userInfo";
import UserInfoConst from "super/pages/userInfoConst";
import * as signalR from "@microsoft/signalr";
import HomeConst from "super/pages/homeConsultpage";
import LoadingPage from "components/loading";

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
  const [userid, setUserId] = useState();
  const [role, setRole] = useState();
  const [accountid, setAccountId] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [phone, setPhone] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");
  const userID = localStorage.setItem("userID", userid);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getDataAccessToken();

        const data = await authorizeUser();
        console.log(data);
        console.log(data["scope.userInfo"]);

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

        const phone = response.data.data.number; // Ensure this is valid
        // const userId = await getUserIDUser();
        const userInfo1 = await getUser(data["scope.userInfo"]);

        console.log("userinfo", userInfo1);
        setUserInfo(userInfo1); // This updates userInfo state
        setPhone(phone); // Store phone in state if needed
        setAccessToken(token); // Store the token once fetched
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchLogin = async () => {
      if (!userInfo || !phone) return; // Ensure values are ready

      try {
        const resposneLogin = await login({
          zaloId: userInfo.userInfo.id,
          phone: phone,
          image_Url: userInfo.userInfo.avatar,
          // zaloId: "string",
          // phone: "84918107843",
          // image_Url: "string",
        });
        console.log(resposneLogin);

        const { userId, role, accountId, accessToken } = resposneLogin.data;
        localStorage.clear();
        setRole(role);
        setUserId(userId);
        setAccountId(accountId);
        localStorage.setItem("accountId", accountId);

        console.log("token:", accessToken);
        localStorage.setItem("token", accessToken);
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    fetchLogin();
  }, [userInfo, phone]); // Add dependencies

  console.log("userid", userid);
  console.log("role", role);

  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            {/* <HeaderBar /> */}
            <Routes>
              {role === 2 ? (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/news" element={<News />} />
                  <Route
                    path="/notification"
                    element={<Notification accountId={accountid} role={role} />}
                  />
                  <Route path="/newsdetail/:id" element={<NewDetail />} />
                  <Route
                    path="/expert"
                    element={<ExpertPage studentId={userid} />}
                  />
                  <Route path="/allexpert/:id" element={<AllExpert />} />
                  <Route
                    path="/expertDetail/:id"
                    element={<ExpertDetailPage studentId={userid} />}
                  />
                  <Route
                    path="/user"
                    element={
                      <User
                        studentId={userid}
                        accountId={accountid}
                        info={userInfo}
                      />
                    }
                  />
                  <Route
                    path="/transaction"
                    element={<Transaction accountId={accountid} />}
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
                  <Route
                    path="/mbtiTest"
                    element={<MBTITest studentId={userid} />}
                  />
                  <Route
                    path="/mbtiList"
                    element={<MBTI studentId={userid} />}
                  />
                  <Route
                    path="/hollandList"
                    element={<Holland studentId={userid} />}
                  />
                  <Route
                    path="/hollandTest"
                    element={<HollandTest studentId={userid} />}
                  />
                  <Route path="/major" element={<Major />} />
                  <Route path="/major/:id" element={<Majorbycategory />} />
                  <Route
                    path="/majorCare"
                    element={<MajorCareList studentId={userid} />}
                  />
                  <Route
                    path="/occupationCare"
                    element={<OccupationCareList studentId={userid} />}
                  />
                  <Route
                    path="/majorDetail/:id"
                    element={<MajorDetail studentId={userid} />}
                  />
                  <Route path="/occupation" element={<Occupation />} />
                  <Route
                    path="/occupation/:id"
                    element={<Occupationbygroup />}
                  />
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
                  <Route path="/userInfo" element={<UserInfo />} />
                  <Route
                    path="/testExecuteHolland"
                    element={
                      <TestExecuteHolland
                        studentId={userid}
                        accountId={accountid}
                      />
                    }
                  />
                  <Route
                    path="/ratingMajor"
                    element={<RatingMajor studentId={userid} />}
                  />
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
                    element={<OccupationDetail studentId={userid} />}
                  />
                </>
              ) : role === 4 ? (
                <>
                  <Route path="/" element={<HomeConst />} />

                  <Route
                    path="/consultantScheldule"
                    element={<ConsultantSchedulePage userid={userid} />}
                  />
                  <Route path="/userInfoConst" element={<UserInfoConst />} />
                  <Route
                    path="/transaction"
                    element={<Transaction accountId={accountid} />}
                  />
                  {/* <Route path="/consultantpage/:id" element={<ConsultantPage consultantId={userid} accountId={accountid} />} /> */}
                  <Route path="/major" element={<Major />} />
                  <Route path="/major/:id" element={<Majorbycategory />} />
                  <Route path="/majorDetail/:id" element={<MajorDetail />} />
                  <Route path="/occupation" element={<Occupation />} />
                  <Route
                    path="/notification"
                    element={<Notification accountId={accountid} role={role} />}
                  />
                  <Route
                    path="/occupation/:id"
                    element={<Occupationbygroup />}
                  />
                  <Route
                    path="/consultantpage"
                    element={
                      <ConsultantPage
                        consultantId={userid}
                        accountId={accountid}
                      />
                    }
                  />
                  <Route path="/news" element={<News />} />
                  <Route path="/newsdetail/:id" element={<NewDetail />} />
                </>
              ) : (
                <Route
                  path="/consultantpage"
                  element={
                    <ConsultantPage
                      consultantId={userid}
                      accountId={accountid}
                    />
                  }
                /> // Đường dẫn mặc định nếu role không hợp lệ
              )}
            </Routes>
            {role === 4 ? (
              <>
                <CustomBottomNavigation
                  userid={userid}
                  // hasNewNotification={hasNewNotification}
                />
              </>
            ) : (
              <BottomNavigationPage
              // hasNewNotification={hasNewNotification}
              />
            )}
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;
