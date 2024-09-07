import React, { useState } from "react";
import { Page, Icon, BottomNavigation } from "zmp-ui";
import UserCard from "../components/user-card";

const BottomNavigationPage = (props) => {
  const [activeTab, setActiveTab] = useState("chat");
  const { title } = props;
  return (
    <Page className="page">
      <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
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
