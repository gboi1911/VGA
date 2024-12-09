import React, { useState, useEffect } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";

const CustomBottomNavigation = ({ userid, accountid, hasNewNotification }) => {
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
  const [notificationState, setNotificationState] =
    useState(hasNewNotification);

  // Synchronize notification state with prop `hasNewNotification`
  useEffect(() => {
    setNotificationState(hasNewNotification);
  }, [hasNewNotification]);

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
        targetPath = "/news";
        break;
      case "schedule":
        targetPath = "/consultantScheldule";
        break;
      case "notify":
        targetPath = "/notification";
        setNotificationState(false); // Reset notification state when navigating to notifications
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
                {notificationState && (
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
