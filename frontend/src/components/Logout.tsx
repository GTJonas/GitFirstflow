import { useNavigate } from "react-router-dom";
import Button from "./props/Button";
import { Div } from "./props/Div";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");

    // Clear the JWT token from localStorage
    localStorage.removeItem("token");

    // Clear the user data from sessionStorage
    localStorage.removeItem("userData");

    sessionStorage.removeItem("isReloaded");

    // Redirect to the login page
    navigate("/login");
    console.log("Redirecting...");
  };

  const styles = [
    {
      width: "100%",
      height: "100px",
    },
  ];
  const classNames = ["hover-button rounded-0", "icon-logout", "logout"];

  return (
    <Div
      style={undefined}
      content={
        <Button
          content={`LOGGA UT`}
          onClick={handleLogout}
          style={styles[0]}
          className={classNames[0]}
          disabled={undefined}
          type={`button`}
        />
      }
      className={classNames[2]}
      onClick={undefined}
    />
  );
};

export default Logout;
