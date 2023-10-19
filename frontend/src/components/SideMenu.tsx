import { useEffect, useState } from "react";
import DesktopMenu from "./Menu/DesktopMenu.tsx";
import MobileMenu from "./Menu/MobileMenu.tsx";
import {
  List1Menu,
  List2Menu,
  List3Menu,
  List4Menu,
} from "./Menu/menuItems/ListMenu.tsx";
import TabletMenu from "./Menu/TabletMenu.tsx";

function SideMenu({ user }) {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isTabletViewport, setIsTabletViewport] = useState(false);

  // Handle window resize event
  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= 640);
      setIsTabletViewport(window.innerWidth <= 1024);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Render the menu items based on the user's roleId]
  let menuItems;
  switch (user.user.roleId) {
    case 1:
      menuItems = <List1Menu />;
      break;
    case 2:
      menuItems = <List2Menu />;
      break;
    case 3:
      menuItems = <List3Menu />;
      break;
    case 4:
      menuItems = <List4Menu />;
      break;
    default:
      menuItems = <p>Error</p>;
      break;
  }

  if (isMobileViewport) {
    return <MobileMenu user={user} menuItems={menuItems} />;
  } else if (isTabletViewport) {
    return <TabletMenu user={user} menuItems={menuItems} />;
  } else {
    return <DesktopMenu user={user} menuItems={menuItems} />;
  }
}

export default SideMenu;
