import React, { useState, useEffect, useMemo } from "react";
import { Icon, BottomNavigation } from "zmp-ui";
import { useLocation, useNavigate } from "react-router-dom";
import useVirtualKeyboardVisible from "./useVirtualKeyboardVisible";

// Update this to include dynamic route patterns
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

  const getTabFromPath = (path) => {
    if (
      path.startsWith("/explore") ||
      path.startsWith("/hollandTest") ||
      path.startsWith("/mbtiTest") ||
      path.startsWith("/major") ||
      path.startsWith("/occupation") ||
      path.startsWith("/university") ||
      path.startsWith("/personal") ||
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
    let targetPath = "/";
    switch (key) {
      case "explore":
        targetPath = "/explore";
        break;
      case "expert":
        targetPath = "/expert";
        break;
      case "me":
        targetPath = "/user";
        break;
      default:
        targetPath = "/";
    }
    navigate(targetPath);
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
