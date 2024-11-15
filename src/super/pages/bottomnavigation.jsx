import React, { useState } from "react";
import { BottomNavigation, Icon, Page } from "zmp-ui";
import ConsultantSchedulePage from "./ConsultantSchedulePage";
// import HomePageConsultant from "./HomePageConsultant";
// import CalendarPage from "./calendarpage";
import HomePage from "pages/home";
// import DateCalendarServerRequest from "super/pages/HomePageConsultant";
// import FirstComponent from "super/pages/HomePageConsultant";
import WeekPicker from "super/pages/HomePageConsultant";
import News from "super/section/news/news";
import ConsultantPage from "super/pages/consultantpage";

export default function CustomBottomNavigation({ userid, accountid }) {
  const [activeTab, setActiveTab] = useState("homepage");
  // const { title } = props;

  const renderContent = () => {
    switch (activeTab) {
      case "homepage":
        return <HomePage key="homepage" />;
      case "schedule":
        return <ConsultantSchedulePage key="schedule" userid={userid} />;
      // case "news":
      //   return <News key="news" />;
      // case "calendar":
      //   return <WeekPicker key="calendar" />;
      case "me":
      default:
        return <ConsultantPage consultantId={userid} accountId={accountid} key="me" />;
    }
  };


  return (
    <Page className="page">
      {renderContent()}
      <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        <BottomNavigation.Item
          label="Trang chủ"
          key="homepage"
          icon={<Icon icon="zi-home" />}
          activeIcon={<Icon icon="zi-home" />}
        />
        {/* <BottomNavigation.Item
          label="Tin tức"
          key="news"
          icon={<Icon icon="zi-more-grid" />}
          activeIcon={<Icon icon="zi-more-grid-solid" />}
        /> */}
        <BottomNavigation.Item
          label="Tạo lịch"
          key="schedule"
          icon={<Icon icon="zi-clock-1-solid" />}
          activeIcon={<Icon icon="zi-clock-1-solid" />}
        />
        {/* <BottomNavigation.Item
          label="Lịch"
          key="calendar"
          icon={<Icon icon="zi-calendar" />}
          activeIcon={<Icon icon="zi-calendar" />}
        /> */}
        {/* <BottomNavigation.Item
                    key="calendar"
                    label="Lịch"
                    icon={<Icon icon="zi-calendar" />}
                    activeIcon={<Icon icon="zi-calendar-solid" />}
                /> */}
        <BottomNavigation.Item
          key="me"
          label="Cá nhân"
          icon={<Icon icon="zi-user" />}
          activeIcon={<Icon icon="zi-user-solid" />}
        />
      </BottomNavigation>
    </Page>
  );
}
