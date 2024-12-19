import React, { useState, useEffect, useMemo } from "react";
import { Icon, BottomNavigation } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { getNotification } from "api/userInfo";
import useVirtualKeyboardVisible from "./useVirtualKeyboardVisible";

export const NO_BOTTOM_NAVIGATION_PAGES = [
  "/expertDetail/:id",
  "/testExecute",
  "/testExecuteHolland",
  "/universityDetail/:id",
  "/occupationDetail/:id",
  "/majorDetail/:id",
  "/testResult",
  "/testResultHolland",
  "/newsdetail/:id",
  "/filterMajorUniversity",
  "/ratingMajor",
  "/personality",
  "/personalOccupation",
];

const matchNoBottomNavPages = (pathname) => {
  return NO_BOTTOM_NAVIGATION_PAGES.some((route) => {
    const routeRegex = new RegExp(`^${route.replace(":id", "[^/]+")}$`);
    return routeRegex.test(pathname);
  });
};

const BottomNavigationPage = () => {
  const location = useLocation();
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const { pathname } = location;
  // const [on, setOn] = useState(hasNewNotification);
  // const [hasNewNotification, setHasNewNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [test, setTest] = useState(false);
  console.log("notification", notification);
  const token = localStorage.getItem("token");
  const accountId = localStorage.getItem("accountId");

  // useEffect(() => {
  //   setOn(hasNewNotification);
  // }, [hasNewNotification]);
  // useEffect(() => {
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl(`https://vgacareerguidance.id.vn/notification_hub`, {
  //       accessTokenFactory: () => token,
  //     })
  //     .withAutomaticReconnect()
  //     .build();

  //   connection
  //     .start()
  //     .then(() => {
  //       setStatus("Connected to SignalR");
  //       console.log("Connected to SignalR hub.");

  //       connection.on("ReceiveNotification", (message) => {
  //         console.log("Received notification:", message);
  //         setMessages((prevMessages) => [...prevMessages, message]);
  //         setHasNewNotification(true);
  //       });
  //     })
  //     .catch((err) => {
  //       setStatus(`Connection failed: ${err}`);
  //       console.error(err);
  //     });

  //   return () => {
  //     connection.stop();
  //   };
  // }, [token]);
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getNotification(accountId);
        setNotification(response.data);
      } catch (error) {
        console.error("Error fetching notification list:", error);
      }
    };

    fetchNotification();
  }, [accountId, test]);

  const access_token = token;
  console.log("access_token", access_token);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://vgacareerguidance.id.vn/notification_hub`, {
        accessTokenFactory: () => access_token,
      })
      .withAutomaticReconnect()
      .build();

    // Kết nối SignalR
    connection
      .start()
      .then(() => {
        // setStatus("Connected to SignalR");
        console.log("Connected to SignalR hub.");

        // Nhận thông báo từ server
        connection.on("ReceiveNotification", (notitfycation) => {
          console.log("Received notification:", notitfycation);
          setNotification((prevMessages) => [...prevMessages, notitfycation]);
          console.log("hello");
          setTest((pre) => !pre);
          // setNotification((prevMessages) => {
          //   // Kiểm tra nếu thông báo mới không trùng `createdAt` với thông báo cũ
          //   const isDuplicate = prevMessages.some(
          //     (message1) =>
          //       new Date(message1.createdAt).getTime() ===
          //       new Date(notitfycation.createdAt).getTime()
          //   );

          //   // Chỉ thêm vào nếu không trùng
          //   return isDuplicate
          //     ? prevMessages
          //     : [...prevMessages, notitfycation];
          // });
        });
      })
      .catch((err) => {
        setStatus(`Connection failed: ${err}`);
        console.error(err);
      });

    // Clean up khi component unmount
    return () => {
      connection.stop();
      console.log("connection stop");
    };
  }, [access_token, token]);

  const getTabFromPath = (path) => {
    if (
      path.startsWith("/explore") ||
      path.startsWith("/hollandTest") ||
      path.startsWith("/hollandList") ||
      path.startsWith("/mbtiList") ||
      path.startsWith("/mbtiTest") ||
      path.startsWith("/major") ||
      path.startsWith("/occupation") ||
      path.startsWith("/university") ||
      path.startsWith("/testExecuteHolland") ||
      path.startsWith("/testExecute") ||
      path.startsWith("/testResult") ||
      path.startsWith("/testResultHolland") ||
      path.startsWith("/majorDetail") ||
      path.startsWith("/occupationDetail") ||
      path.startsWith("/universityDetail") ||
      path.startsWith("/ratingMajor") ||
      path.startsWith("/filterMajorUniversity")
    ) {
      return "explore";
    } else if (
      path.startsWith("/user") ||
      path.startsWith("/transaction") ||
      path.startsWith("/occupationCare") ||
      path.startsWith("/majorCare") ||
      path.startsWith("/expert") ||
      path.startsWith("/personal")
    ) {
      return "me";
    } else if (path === "/notification") {
      return "notify";
    } else {
      return "home";
    }
  };
  const [activeTab, setActiveTab] = useState(getTabFromPath(pathname));

  // useEffect(() => {
  //   setActiveTab(getTabFromPath(pathname));
  // }, [pathname]);

  const handleTabChange = (key) => {
    let targetPath = "/";
    switch (key) {
      case "explore":
        targetPath = "/explore";
        break;
      case "me":
        targetPath = "/user";
        break;
      case "notify":
        targetPath = "/notification";
        // setOn(false);
        break;
      default:
        targetPath = "/";
    }
    navigate(targetPath);
    setActiveTab(key);
  };

  const handleTabClick = (key) => {
    if (activeTab === key) {
      console.log("Tab hiện tại được nhấn lại:", key);
      handleTabChange(key);
    } else {
      handleTabChange(key);
    }
  };

  const getIcon = (key, isActive) => {
    const baseIcon = {
      home: "zi-home",
      explore: "zi-more-grid",
      me: "zi-user",
      notify: "zi-notif",
    };

    // Icons without solid variants
    const noSolidIcons = ["home", "notify"];

    if (noSolidIcons.includes(key)) {
      return baseIcon[key]; // Return the base icon for home and notify
    }

    return isActive ? baseIcon[key] + "-solid" : baseIcon[key];
  };

  const noBottomNav = useMemo(
    () => matchNoBottomNavPages(location.pathname),
    [location]
  );

  if (noBottomNav || keyboardVisible) {
    return null;
  }

  return (
    <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
      {["home", "explore", "notify", "me"].map((key) => (
        <BottomNavigation.Item
          key={key}
          label={
            key === "home"
              ? "Trang chủ"
              : key === "explore"
              ? "Khám phá"
              : key === "notify"
              ? "Thông báo"
              : "Cá nhân"
          }
          icon={
            key === "notify" ? (
              <div className="relative">
                <Icon icon={getIcon(key, activeTab === key)} />
                {/* {on && ( */}
                {notification.filter((item) => item.status === 0).length >
                  0 && (
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
                )}
              </div>
            ) : (
              <Icon icon={getIcon(key, activeTab === key)} />
            )
          }
          activeIcon={
            key === "notify" ? (
              <div className="relative">
                <Icon icon={getIcon(key, true)} />
                {/* {on && ( */}
                {notification.filter((item) => item.status === 0).length >
                  0 && (
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
                )}
              </div>
            ) : (
              <Icon icon={getIcon(key, true)} />
            )
          }
          onClick={() => handleTabClick(key)}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomNavigationPage;
