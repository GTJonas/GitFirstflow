import React, { useEffect, useState } from "react";
import { useLogin } from "../../api/api.tsx";
import { useNavigate } from "react-router-dom";
import Button from "../../components/props/Button.tsx";
import "../../assets/image.css";

const LoginPage = ({ user }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { isLoggedIn, loginError, isLoggingIn, loginUser } = useLogin(
    1,
    "POST", // Specify the HTTP method
    {
      email,
      password,
      remember: rememberMe,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(); // Call the login function from the useLogin hook
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token || isLoggedIn) {
      navigate("/"); // Redirect to the login page if token or user data is missing
    }
  }, [navigate, token, isLoggedIn]);

  if (token || isLoggedIn) {
    return null; // Return null to prevent further rendering
  }

  return (
    <>
      <div className="d-flex overflow-hidden">
        <div className="p-5 flex-fill">
          <div
            className="flex-column mx-auto"
            style={{ width: "100%", padding: "10em" }}
          >
            <h3>Lagga in på ditt konto</h3>
            <div className="p-2"></div>
            <p>
              Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod
              tempor.
            </p>
            <div className="p-2"></div>
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="E-post"
                  className="border-0 rounded-3 p-3"
                />
                <div className="p-2"></div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Lösenord"
                  className="border-0 rounded-3 p-3"
                />
                <div className="p-4"></div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="border-0 rounded-3 p-4"
                  style={{ background: "#77148E", color: "#ffffff" }}
                >
                  {isLoggingIn ? "Logging in..." : "Logga in"}
                </button>
              </div>
            </form>
            <div className="p-3"></div>
            <div className="d-flex flex-column">
              <p className="mx-auto" style={{ fontWeight: "600" }}>
                Har du inget konto?
              </p>
              <div className="p-1"></div>
              <Button
                text={`Registrera dig`}
                onClick={undefined}
                style={{
                  background: "#ffffff",
                  color: "#77148E",
                  borderColor: "#77148E", // Change this to the desired border color
                  fontWeight: "600",
                }}
                className={`border-3 rounded-3 p-4`}
                disabled={undefined}
              />
            </div>
          </div>
        </div>
        <i className="login-bg"></i>
      </div>
    </>
  );
};

export default LoginPage;
