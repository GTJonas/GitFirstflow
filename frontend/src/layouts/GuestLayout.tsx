import Login from "./views/Login.tsx";

const GuestLayout: React.FC = () => {
  // Retrieve user data from localStorage
  const storedUserData = localStorage.getItem("userData");
  const user = storedUserData ? JSON.parse(storedUserData) : null;

  return (
    <div>
      <Login user={user} />
    </div>
  );
};

export default GuestLayout;
