import React, { useState, useEffect } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";

const CustomBottomNavigation = ({ userid, accountid }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const getTabFromPath = (path) => {
    if (path.startsWith("/consultantScheldule")) {
      return "schedule";
    } else if (path === "/consultantpage") {
      return "me";
    } else {
      return "homepage";
    }
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath(pathname));

  const handleTabClick = (key) => {
    debugger;
    if (activeTab === key) {
      // Tab hiện tại được nhấn, xử lý refresh
      console.log("Tab hiện tại được nhấn lại:", key);
      handleTabChange(key);
    } else {
      // Chuyển sang tab khác
      handleTabChange(key);
    }
  };

  useEffect(() => {
    setActiveTab(getTabFromPath(pathname));
  }, [pathname]);

  const handleTabChange = (key) => {
    debugger
    let targetPath = "/";

    switch (key) {
      case "homepage":
        targetPath = "/news";
        break;
      case "schedule":
        targetPath = "/consultantScheldule";
        break;
      case "me":
        targetPath = "/consultantpage";
        break;
      default:
        targetPath = "/";
    }
    navigate(targetPath);
    setActiveTab(key); // Cập nhật tab hiện tại
  };

  return (
    <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
      {["homepage", "schedule", "me"].map((key) => (
        <BottomNavigation.Item
          key={key}
          label={
            key === "homepage"
              ? "Trang chủ"
              : key === "schedule"
                ? "Tạo lịch"
                : "Cá nhân"
          }
          icon={<Icon icon={key === "homepage" ? "zi-home" : key === "schedule" ? "zi-clock-1-solid" : "zi-user"} />}
          activeIcon={<Icon icon={key === "homepage" ? "zi-home" : key === "schedule" ? "zi-clock-1-solid" : "zi-user-solid"} />}
          onClick={() => handleTabClick(key)} // Bắt sự kiện click
        />
      ))}
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
