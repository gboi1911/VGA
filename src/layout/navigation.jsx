import React, { useState, useEffect } from "react";
import { Page, Icon, BottomNavigation } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigationPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const getTabFromPath = (path) => {
    if (
      path.startsWith("/explore") ||
      path.startsWith("/hollandTest") ||
      path.startsWith("/mbtiTest") ||
      path.startsWith("/major") ||
      path.startsWith("/occupation") ||
      path.startsWith("/mbtiTest") ||
      path.startsWith("/university") ||
      path.startsWith("/personal") ||
      path.startsWith("/testExecuteHolland") ||
      path.startsWith("/testExecute") ||
      path.startsWith("/testResult") ||
      path.startsWith("/testResultHolland") ||
      path.startsWith("/majorDetail/:id") ||
      path.startsWith("/occupationDetail/:id") ||
      path.startsWith("/universityDetail/:id") ||
      path.startsWith("/ratingMajor") ||
      path.startsWith("/filterMajorUniversity")
    ) {
      return "explore";
    } else if (path.startsWith("/expert") || path.startsWith("/expertDetail")) {
      return "expert";
    } else if (path === "/user") {
      return "me";
    } else {
      return "home";
    }
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath(pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(pathname));
  }, [pathname]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    switch (key) {
      case "explore":
        // Instead of navigating, replace the current entry
        navigate("/explore", { replace: true });
        break;
      case "expert":
        navigate("/expert", { replace: true });
        break;
      case "me":
        navigate("/user", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
  };

  return (
    <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
      <BottomNavigation.Item
        key="home"
        label="Trang chủ"
        icon={<Icon icon="zi-home" />}
        activeIcon={<Icon icon="zi-home" />}
      />
      <BottomNavigation.Item
        label="Khám phá"
        key="explore"
        icon={<Icon icon="zi-more-grid" />}
        activeIcon={<Icon icon="zi-more-grid-solid" />}
      />
      <BottomNavigation.Item
        label="Tư vấn"
        key="expert"
        icon={<Icon icon="zi-chat" />}
        activeIcon={<Icon icon="zi-chat-solid" />}
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

export default BottomNavigationPage;
