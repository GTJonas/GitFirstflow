import UserProfile from "./UserProfile";
import "../../assets/main.css";
import "../../assets/Icons/Icons.css";
import Logout from "../Logout.tsx";

const DesktopMenu = ({ user, menuItems }) => {
  return (
    <div className="DesktopMenu">
      <UserProfile user={user} />
      <nav>
        <ul>{menuItems}</ul>
      </nav>
      <Logout />
    </div>
  );
};

export default DesktopMenu;
