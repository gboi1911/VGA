import React, { useState, useEffect } from "react";
import { Page, Icon, BottomNavigation } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigationPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const getTabFromPath = (path) => {
    if (path.startsWith("/test") || path.startsWith("/testDetail")) {
      return "test";
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
      case "test":
        // Instead of navigating, replace the current entry
        navigate("/test", { replace: true });
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
        label="Bài test"
        key="test"
        icon={<Icon icon="zi-quote" />}
        activeIcon={<Icon icon="zi-quote-solid" />}
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
