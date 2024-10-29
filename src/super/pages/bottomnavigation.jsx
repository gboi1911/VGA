import React, { useState } from "react";
import { BottomNavigation, Icon, Page } from "zmp-ui";
import ConsultantSchedulePage from "./ConsultantSchedulePage";
import HomePageConsultant from "./HomePageConsultant";
import CalendarPage from "./calendarpage";

export default function CustomBottomNavigation(props) {
    const [activeTab, setActiveTab] = useState("homepage");
    const { title } = props;

    const renderContent = () => {
        switch (activeTab) {
            case "homepage":
            // return <HomePageConsultant />;
            case "news":
            // return <NewsPage />;
            case "schedule":
                return <ConsultantSchedulePage />;
            case "calendar":
                return <CalendarPage />;
            case "me":
            // return <ProfilePage />;
            default:
                return <HomePageConsultant />;
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
                <BottomNavigation.Item
                    label="Tin tức"
                    key="news"
                    icon={<Icon icon="zi-clock-1-solid" />}
                    activeIcon={<Icon icon="zi-clock-1-solid" />}
                />
                <BottomNavigation.Item
                    label="Lịch"
                    key="schedule"
                    icon={<Icon icon="zi-calendar" />}
                    activeIcon={<Icon icon="zi-calendar" />}
                />
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
    )
}

