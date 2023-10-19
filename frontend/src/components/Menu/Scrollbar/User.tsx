import { Link } from "react-router-dom"; // Import useHistory

function User({ user }) {
  const firstLetterOfLastName = user.last_name.charAt(0);

  return (
    <Link
      to={`/?user=${user.uuid}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div
        className="user"
        style={{
          display: "flex",
          flexDirection: "column", // Corrected typo here
          alignItems: "center", // Use alignItems to center content vertically
        }}
      >
        <img
          src={user.profile_picture}
          className="rounded-circle"
          style={{ height: "50px", width: "50px", objectFit: "cover" }}
          alt={`${user.first_name} ${user.last_name}`}
        />

        <p>
          {user.first_name} {firstLetterOfLastName}
        </p>
      </div>
    </Link>
  );
}

export default User;
