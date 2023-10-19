import { useState } from "react";
import Logo from "../../assets/Firstflow.png";
import Scrollbar from "./Scrollbar/Scrollbar.tsx";
import Logout from "../Logout.tsx";
import { useLocation } from "react-router-dom";

const SimilarComponent = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if the route is "/settings" and hide the Scrollbar accordingly
  const isSettingsRoute = location.pathname === "/settings";
  const isCompanyRoute = location.pathname.startsWith("/company/");

  return (
    <div className="Menu" style={{ position: "absolute", overflow: "visible" }}>
      <div className="Tablet--top">
        <div>
          <img className="logo" src={Logo} alt="Logo" />
        </div>
        <div className="Tablet--menu">
          <div className="icon-hamburgermenu" onClick={toggleMenu}></div>
        </div>
      </div>

      {isSettingsRoute || isCompanyRoute ? null : <Scrollbar />}

      {isMenuOpen && (
        <div
          className="popup-menu"
          style={{
            position: "fixed",
            top: 0,
            right: 0, // Stick to the right side of the viewport
            margin: "0",
            width: "100vw", // 80% of viewport width
            height: "100vh", // 100% of viewport height
            backgroundColor: "white",
            zIndex: 9999, // A high z-index value
          }}
        >
          {/* Put your menu navigation content here */}
          <div className="Tablet--top">
            <div>
              <img className="logo" src={Logo} alt="Logo" />
            </div>
            <div className="Tablet--menu">
              <div className="icon-hamburgermenu" onClick={toggleMenu}></div>
            </div>
          </div>
          <div className="Tablet">
            <nav>
              <ul>
                {menuItems}
                <Logout />
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarComponent;
