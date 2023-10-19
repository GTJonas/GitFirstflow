import { useEffect, useState } from "react";
import "../assets/main.css";
import CreateSchoolClass from "./class/createSchoolClass.tsx";

import ShowOwnClass from "./class/SchoolClass.tsx";
import CreatePost from "./posts/createPost.tsx";
import Stats from "./posts/Stats.tsx";
import Company from "../layouts/views/Company.tsx";
import FilteredPosts from "./posts/filteredPosts/FilteredPosts.tsx";
import { useLocation } from "react-router-dom";
import CompanyLists from "./company/CompanyLists.tsx";
import ChangeProfile from "./settings/ChangeProfile.tsx";
import ClassRuleStore from "./class/classRule/store.tsx";

function ContentWrapper({ user }: { user: any }) {
  const Url = window.location.pathname.toLowerCase();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [logShown, setLogShown] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
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

  const location = useLocation();
  const urlPath = location.pathname;

  let content;

  switch (Url) {
    case "/settings":
      content = <ChangeProfile user={user} />;
      if (!logShown) {
        console.log("This is the settings view");
        setLogShown(true);
      }
      break;
    case "/class":
      content = (
        <>
          <CreateSchoolClass />
          <ShowOwnClass />
          <ClassRuleStore />
        </>
      );
      if (!logShown) {
        console.log("This is the school view");
        setLogShown(true);
      }
      break;
    case "/history":
      content = (
        <>
          <p>Historik{user.user.user_name}</p>

          <img
            src={user.user.profilePicture}
            className="rounded-circle"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          ></img>
          <p>
            {user.user.first_name} {user.user.last_name}
          </p>
          {/* Will add some paramaters for it only showing your own post preferably also archived*/}
          <FilteredPosts user={user} />
        </>
      );
      if (!logShown) {
        console.log("This is the ownposts view");
        setLogShown(true);
      }
      break;
    case "/test":
      content = <FilteredPosts user={user} />;
      if (!logShown) {
        console.log("This is a test view");
        setLogShown(true);
      }
      break;
    default:
      // Check for dynamic route for company profiles
      if (urlPath.startsWith("/company/")) {
        content = <Company />;
        if (!logShown) {
          console.log("This is a company view");
          setLogShown(true);
        }
      } else if (urlPath.startsWith("/company-lists")) {
        content = <CompanyLists />;
        if (!logShown) {
          console.log("This is a company view");
          setLogShown(true);
        }
      } else {
        content = (
          <>
            {user.user.roleId === 4 && <CreatePost user={user} />}
            {user.user.roleId === 3 && <Stats />}
            <FilteredPosts user={user} />
          </>
        );
        if (!logShown) {
          console.log("This is the standard view");
          setLogShown(true);
        }
      }
      break;
  }

  if (content !== null) {
    return (
      <div className="ContentWrapper-Main">
        <div className="ContentWrapper">{content}</div>
      </div>
    );
  } else {
    return null; // Or any other fallback JSX you want to render
  }
}

export default ContentWrapper;
