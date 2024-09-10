// src/pages/BottomNavigationPage.js
import React, { useState, useEffect } from "react";
import { Page, Icon, BottomNavigation } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigationPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  
  const getTabFromPath = (path) => {
    switch (path) {
      case "/test":
        return "test";
      case "/expert":
        return "expert";
      case "/user":
        return "me";
      default:
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
        navigate("/test");
        break;
      case "expert":
        navigate("/expert");
        break;
      case "me":
        navigate("/user");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <Page className="page">
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
    </Page>
  );
};

export default BottomNavigationPage;
