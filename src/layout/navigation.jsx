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
    // Logic điều hướng
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
    setActiveTab(key); // Cập nhật tab hiện tại
  };

  const handleTabClick = (key) => {
    if (activeTab === key) {
      // Tab hiện tại được nhấn, xử lý refresh
      console.log("Tab hiện tại được nhấn lại:", key);
      handleTabChange(key);
    } else {
      // Chuyển sang tab khác
      handleTabChange(key);
    }
  };

  const getIcon = (key, isActive) => {
    switch (key) {
      case "home":
        return isActive ? "zi-home" : "zi-home";
      case "explore":
        return isActive ? "zi-more-grid-solid" : "zi-more-grid";
      case "expert":
        return isActive ? "zi-chat-solid" : "zi-chat";
      case "me":
        return isActive ? "zi-user-solid" : "zi-user";
      default:
        return "zi-home";
    }
  };




  const noBottomNav = useMemo(
    () => matchNoBottomNavPages(location.pathname),
    [location]
  );

  if (noBottomNav || keyboardVisible) {
    return null;
  }

  return (
    // <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
    //   <BottomNavigation.Item
    //     key="home"
    //     label="Trang chủ"
    //     icon={<Icon icon="zi-home" />}
    //     activeIcon={<Icon icon="zi-home" />}
    //   />
    //   <BottomNavigation.Item
    //     label="Khám phá"
    //     key="explore"
    //     icon={<Icon icon="zi-more-grid" />}
    //     activeIcon={<Icon icon="zi-more-grid-solid" />}
    //   />
    //   <BottomNavigation.Item
    //     label="Tư vấn"
    //     key="expert"
    //     icon={<Icon icon="zi-chat" />}
    //     activeIcon={<Icon icon="zi-chat-solid" />}
    //   />
    //   <BottomNavigation.Item
    //     key="me"
    //     label="Cá nhân"
    //     icon={<Icon icon="zi-user" />}
    //     activeIcon={<Icon icon="zi-user-solid" />}
    //   />
    // </BottomNavigation>
    <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
      {["home", "explore", "expert", "me"].map((key) => (
        <BottomNavigation.Item
          key={key}
          label={key === "home" ? "Trang chủ" : key === "explore" ? "Khám phá" : key === "expert" ? "Tư vấn" : "Cá nhân"}
          icon={<Icon icon={getIcon(key, false)} />}
          activeIcon={<Icon icon={getIcon(key, true)} />}
          onClick={() => handleTabClick(key)} // Bắt click kể cả khi không đổi tab
        />
      ))}
    </BottomNavigation>

  );
};

export default BottomNavigationPage;
