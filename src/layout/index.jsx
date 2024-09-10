import BottomNavigationPage from "./navigation";
import HeaderBar from "./header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return(
        <div>
            <Outlet/>
            <HeaderBar/>
            <BottomNavigationPage/>
        </div>
    );
};

export default MainLayout;