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
                return <HomePageConsultant />;
            case "news":
                return <NewsPage />;
            case "schedule":
                return <ConsultantSchedulePage />;
            case "calendar":
                return <CalendarPage />;
            case "me":
                return <ProfilePage />;
            default:
                return <HomePage />;
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
                    key="homepage"
                    label="Trang chủ"
                    icon={<Icon icon="zi-chat" />}
                    activeIcon={<Icon icon="zi-chat-solid" />}
                />
                <BottomNavigation.Item
                    label="Tin tức"
                    key="news"
                    icon={<Icon icon="zi-call" />}
                    activeIcon={<Icon icon="zi-call-solid" />}
                />
                <BottomNavigation.Item
                    label="Đặt lịch"
                    key="schedule"
                    icon={<Icon icon="zi-more-grid" />}
                    activeIcon={<Icon icon="zi-more-grid-solid" />}
                />
                <BottomNavigation.Item
                    key="calendar"
                    label="Lịch"
                    icon={<Icon icon="zi-calendar" />}
                    activeIcon={<Icon icon="zi-calendar-solid" />}
                />
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

