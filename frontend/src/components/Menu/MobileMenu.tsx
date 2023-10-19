import "../../assets/Icons/Icons.css";
import MobUserProfile from "./MobUserProfile.tsx";
import { useLocation } from "react-router-dom";

const MobileMenu = ({ user, menuItems }) => {
  const location = useLocation(); // Get the current location

  // Check if the route is "/settings" and hide the Scrollbar accordingly
  const isSettingsRoute = location.pathname === "/settings";

  return isSettingsRoute ? (
    <div className="MobileMenu" style={{ marginBottom: "100px" }}>
      <MobUserProfile menuItems={menuItems} />
    </div>
  ) : (
    <div className="MobileMenu" style={{ marginBottom: "200px" }}>
      <MobUserProfile menuItems={menuItems} />
    </div>
  );
};

export default MobileMenu;
