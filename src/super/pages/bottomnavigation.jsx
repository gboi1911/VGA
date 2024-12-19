import React, { useState, useEffect } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";
import { getNotification } from "api/userInfo";

const CustomBottomNavigation = ({ userid, accountid }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const getTabFromPath = (path) => {
    if (path.startsWith("/consultantScheldule")) {
      return "schedule";
    } else if (path === "/notification") {
      return "notify";
    } else if (path === "/consultantpage") {
      return "me";
    } else {
      return "homepage";
    }
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath(pathname));

  const [notification, setNotification] = useState([]);
  const [test, setTest] = useState(false);
  console.log("notification", notification);
  const token = localStorage.getItem("token");
  const accountId = localStorage.getItem("accountId");

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

  const handleTabClick = (key) => {
    if (activeTab === key) {
      // Refresh the current tab
      console.log("Tab hiện tại được nhấn lại:", key);
      handleTabChange(key);
    } else {
      // Switch to another tab
      handleTabChange(key);
    }
  };

  useEffect(() => {
    setActiveTab(getTabFromPath(pathname));
  }, [pathname]);

  const handleTabChange = (key) => {
    let targetPath = "/";

    switch (key) {
      case "homepage":
        targetPath = "/";
        break;
      case "schedule":
        targetPath = "/consultantScheldule";
        break;
      case "notify":
        targetPath = "/notification";
        break;
      case "me":
        targetPath = "/consultantpage";
        break;
      default:
        targetPath = "/";
    }
    navigate(targetPath);
    setActiveTab(key); // Update the current tab
  };

  return (
    <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
      {["homepage", "schedule", "notify", "me"].map((key) => (
        <BottomNavigation.Item
          key={key}
          label={
            key === "homepage"
              ? "Trang chủ"
              : key === "notify"
              ? "Thông báo"
              : key === "schedule"
              ? "Tạo lịch"
              : "Cá nhân"
          }
          icon={
            key === "notify" ? (
              <div className="relative">
                <Icon
                  icon={
                    key === "homepage"
                      ? "zi-home"
                      : key === "notify"
                      ? "zi-notif"
                      : key === "schedule"
                      ? "zi-clock-1-solid"
                      : "zi-user"
                  }
                />
                {notification.filter((item) => item.status === 0).length >
                  0 && (
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
                )}
              </div>
            ) : (
              <Icon
                icon={
                  key === "homepage"
                    ? "zi-home"
                    : key === "notify"
                    ? "zi-notif"
                    : key === "schedule"
                    ? "zi-clock-1-solid"
                    : "zi-user"
                }
              />
            )
          }
          activeIcon={
            <Icon
              icon={
                key === "homepage"
                  ? "zi-home"
                  : key === "notify"
                  ? "zi-notif"
                  : key === "schedule"
                  ? "zi-clock-1-solid"
                  : "zi-user-solid"
              }
            />
          }
          onClick={() => handleTabClick(key)} // Handle click event
        />
      ))}
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
