import { useLocation, useParams } from "react-router-dom";

import ContentWrapper from "../../components/contentWrapper.tsx";
import RightSidebar from "../../components/RightSidebar.tsx";
import "../../components/Style-modules/Dashboard-style-module.css";
import "../../components/Style-modules/RightSidebar-module.css";
import { useEffect, useState } from "react";

function Dashboard({ user }) {
  const location = useLocation();
  const { uuid } = useParams();
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

  let content;
  let right;

  console.log(uuid);

  switch (location.pathname) {
    default:
      content = (
        <>
          {isMobileViewport || isTabletViewport ? (
            <>
              <ContentWrapper user={user} />
            </>
          ) : (
            <>
              <ContentWrapper user={user} />
              <RightSidebar user={user} />
            </>
          )}
        </>
      );

      break;
    case `/company/${uuid}`:
      content = (
        <>
          {isMobileViewport ? (
            <>
              <ContentWrapper user={user} />
            </>
          ) : (
            <>
              <ContentWrapper user={user} />
            </>
          )}
        </>
      );
      break;
  }

  return (
    <>
      {content}
      {right}
    </>
  );
}

export default Dashboard;
