import { useEffect, useState } from "react";
import axios from "axios";
import getAuthHeaders from "../../../api/getAuthHeaders";
import User from "./User"; // Import the User component

function Scrollbar() {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://194.71.0.30:8000/api/show-own-class";
        const response = await axios.get(apiUrl, { headers: getAuthHeaders() });
        const classes = response.data.classes;
        setClassData(classes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Flatten the nested array of students
  const allStudents = classData.reduce((acc, classItem) => {
    return acc.concat(classItem.students);
  }, []);

  return (
    <div
      className="scrollbar-container"
      style={{ background: "white", paddingTop: "3px" }}
    >
      <ul
        className="user-list "
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          gap: "10px",
        }}
      >
        {allStudents.map((user) => (
          <li
            key={user.uuid}
            className="user-item"
            style={{ listStyle: "none" }}
          >
            {/* Use the User component to display first name and last name */}
            <User user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scrollbar;
