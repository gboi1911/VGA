import React, { useState } from "react";
import { BottomNavigation, Icon, Page } from "zmp-ui";
// import ConsultantSchedulePage from "./ConsultantSchedulePage";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
// import ConsultantPage from "./consultantpage"; 
import HomePage from "pages/home";



// import CalendarPage from "./calendarpage";
// import HomePage from "pages/home";
// import DateCalendarServerRequest from "super/pages/HomePageConsultant";
// import FirstComponent from "super/pages/HomePageConsultant";
// import WeekPicker from "super/pages/HomePageConsultant";
import ConsultantPage from "super/pages/consultantpage";

// export default function CustomBottomNavigation({ userid, accountid }) {
//   const [activeTab, setActiveTab] = useState("homepage");
//   // const { title } = props;

//   const renderContent = () => {
//     switch (activeTab) {
//       case "homepage":
//         return <HomePage key="homepage" />;
//       case "schedule":
//         return <ConsultantSchedulePage key="schedule" userid={userid} />;
//       case "me":
//         return <ConsultantPage consultantId={userid} accountId={accountid} key="me" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Page className="page">
//       {/* Chỉ hiển thị nội dung theo tab */}
//       {renderContent()}
//       <BottomNavigation
//         fixed
//         activeKey={activeTab}
//         onChange={(key) => setActiveTab(key)}
//       >
//         <BottomNavigation.Item
//           label="Trang chủ"
//           key="homepage"
//           icon={<Icon icon="zi-home" />}
//           activeIcon={<Icon icon="zi-home" />}
//         />
//         <BottomNavigation.Item
//           label="Tạo lịch"
//           key="schedule"
//           icon={<Icon icon="zi-clock-1-solid" />}
//           activeIcon={<Icon icon="zi-clock-1-solid" />}
//         />
//         <BottomNavigation.Item
//           key="me"
//           label="Cá nhân"
//           icon={<Icon icon="zi-user" />}
//           activeIcon={<Icon icon="zi-user-solid" />}
//         />
//       </BottomNavigation>
//     </Page>
//   );

// }

const CustomBottomNavigation = ({ userid, accountid }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const lastPaths = useRef({
    homepage: "/",
    schedule: "/consultantScheldule", // Đường dẫn mặc định cho "Tạo lịch"
    me: `/consultantpage`,
  });

  const getTabFromPath = (path) => {
    if (path.startsWith("/consultantScheldule")) {
      return "schedule";
    } else if (path === `/consultantpage`) {
      return "me";
    } else {
      return "homepage";
    }
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath(pathname));

  useEffect(() => {
    const currentTab = getTabFromPath(pathname);
    setActiveTab(currentTab);
    lastPaths.current[currentTab] = pathname; // Lưu lại đường dẫn cuối của tab hiện tại
  }, [pathname]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    navigate(lastPaths.current[key]); // Điều hướng đến đường dẫn lưu trữ
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

