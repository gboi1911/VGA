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

  useEffect(() => {
    setActiveTab(getTabFromPath(pathname));
  }, [pathname]);

  const handleTabChange = (key) => {
    setActiveTab(key);

    switch (key) {
      case "homepage":
        navigate("/news");
        break;
      case "schedule":
        navigate("/consultantScheldule");
        break;
      case "me":
        navigate("/consultantpage");
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
      <BottomNavigation.Item
        key="homepage"
        label="Trang chủ"
        icon={<Icon icon="zi-home" />}
        activeIcon={<Icon icon="zi-home" />}
      />
      <BottomNavigation.Item
        label="Tạo lịch"
        key="schedule"
        icon={<Icon icon="zi-clock-1-solid" />}
        activeIcon={<Icon icon="zi-clock-1-solid" />}
      />
      <BottomNavigation.Item
        key="me"
        label="Cá nhân"
        icon={<Icon icon="zi-user" />}
        activeIcon={<Icon icon="zi-user-solid" />}
      />
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
