import "../../assets/Icons/Icons.css";
import TabUserProfile from "./TabUserProfile.tsx";

const MobileMenu = ({ user, menuItems }) => {
  return (
    <>
      <div className="TabletMenu">
        <TabUserProfile menuItems={menuItems} />
      </div>
      <div className="" style={{ marginBottom: "220px" }}></div>
    </>
  );
};

export default MobileMenu;
