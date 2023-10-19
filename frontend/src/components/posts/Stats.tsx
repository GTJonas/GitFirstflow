import { useState, useEffect } from "react";
import axios from "axios";
import getAuthHeaders from "../../api/getAuthHeaders";
import DoughnutChart from "../../Charts/UserattendanceChart";
import "./stats-module.css";

const Stats = () => {
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [approvedUsers, setApprovedUsers] = useState([]); // Updated state initialization
  const [rejectedUsers, setRejectedUsers] = useState([]); // Updated state initialization
  const [pendingUsers, setPendingUsers] = useState([]); // Updated state initialization

  const [totalStudentsCount, setTotalStudentsCount] = useState(0);

  // State to hold the selected class
  const [classSelector, setClassSelector] = useState(""); // Initialize with an empty string

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false); // State to track the flip animation
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isFlipped2, setIsFlipped2] = useState(false); // State to track the flip animation

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFlipped(!isFlipped); // Toggle the flip animation
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown when an option is selected
    setIsFlipped(false); // Reset the flip animation
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setIsFlipped2(!isFlipped2); // Toggle the flip animation
  };

  const handleOptionClick2 = (option) => {
    setSelectedOption2(option);
    setIsOpen2(false); // Close the dropdown when an option is selected
    setIsFlipped2(false); // Reset the flip animation
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://194.71.0.30:8000/api/getAttendanceStatus",
          {
            headers: {
              ...getAuthHeaders(),
            },
          }
        );

        setClassData(response.data);
        setIsLoading(false);

        setApprovedUsers(response.data.approved);
        setRejectedUsers(response.data.rejected);
        setPendingUsers(response.data.pending);
        setTotalStudentsCount(response.data.studentCount);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [classSelector]);

  // Handler function for class selector change
  const handleClassSelectorChange = (event) => {
    setClassSelector(event.target.value); // Update the classSelector state when the user selects a class
  };
  /*
 const styles = [
    {
      width: "100%",
    },
    {
      width: "100%",
      height: "290px",
    },
    {
      width: "100%",
      padding: "8px",
      justifyContent: "space-between",
    },
    {
      width: "100%",
      height: "100%",
    },
    {
      width: "620px",
      boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.08)",
    },
  ];
*/

  console.log(selectedOption);

  return (
    <div className="py-3">
      {isLoading ? (
        <p>Loading attendance data...</p>
      ) : (
        <>
          <div
            className="container-fluid bg-white rounded-top-4"
            style={{
              paddingBottom: "8px",
              boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="row">
              <div
                className="d-flex"
                style={{
                  height: "150px",
                  width: "150px",
                }}
              >
                <DoughnutChart
                  approvedUsers={approvedUsers}
                  rejectedUsers={rejectedUsers}
                  pendingUsers={pendingUsers}
                />
              </div>
              <div className="w-50 d-flex flex-column justify-content-center align-items-start">
                {pendingUsers.length !== 0 && (
                  <h2 style={{ fontSize: "19px", fontWeight: "500" }}>
                    <span
                      style={{
                        color: "#EBC028",
                        marginRight: "10px",
                        fontWeight: "600",
                      }}
                    >
                      ❚
                    </span>
                    Pending:{" "}
                    <span style={{ fontWeight: "600" }}>
                      {pendingUsers.length} /{" "}
                      {totalStudentsCount -
                        approvedUsers.length -
                        rejectedUsers.length}
                    </span>
                  </h2>
                )}
                <h2 style={{ fontSize: "19px", fontWeight: "500" }}>
                  <span
                    style={{
                      color: "#24E04D",
                      marginRight: "10px",
                      fontWeight: "600",
                    }}
                  >
                    ❚
                  </span>
                  Approved:{" "}
                  <span style={{ fontWeight: "600" }}>
                    {approvedUsers.length} /{" "}
                    {totalStudentsCount - approvedUsers.length}
                  </span>
                </h2>
                <h2 style={{ fontSize: "19px", fontWeight: "500" }}>
                  <span
                    style={{
                      color: "#FF5733",
                      marginRight: "10px",
                      fontWeight: "600",
                    }}
                  >
                    ❚
                  </span>
                  Rejected:{" "}
                  <span style={{ fontWeight: "600" }}>
                    {rejectedUsers.length} /{" "}
                    {totalStudentsCount - approvedUsers.length}
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div
            className="container-fluid mb-4 p-3 bg-white rounded-bottom-4 border-top"
            style={{
              boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="d-flex">
              <div className="dropdown">
                <button
                  onClick={toggleDropdown}
                  className="dropdown-button rounded-2 border-1 btn"
                  style={{ width: "200px", borderColor: "#AEAEAE" }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="text-start">
                      {selectedOption || "Välj klass"}
                    </div>
                    <div
                      className={`text-end icon ${isFlipped ? "flipped" : ""}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 122 67"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.34044 1.65394C8.48525 0.703841 10.1534 0.736259 11.2605 1.73012L61 46.3846L110.74 1.73012C111.847 0.736257 113.515 0.703842 114.66 1.65394L120.39 6.40989C121.777 7.56077 121.843 9.66588 120.532 10.9018L61 67L1.4683 10.9018C0.156766 9.66588 0.223089 7.56077 1.60982 6.40989L7.34044 1.65394Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Display the selected option or default text */}
                </button>
                {isOpen && (
                  <ul className="dropdown-menu rounded-2">
                    <li onClick={() => handleOptionClick("EE20")}>EE20</li>
                    <li onClick={() => handleOptionClick("EE21")}>EE21</li>
                    <li onClick={() => handleOptionClick("EE23")}>EE23</li>
                    {/* Add more menu items as needed */}
                  </ul>
                )}
              </div>
              <div className="p-1"></div>
              <div className="dropdown">
                <button
                  onClick={toggleDropdown2}
                  className="dropdown-button rounded-2 border-1 btn"
                  style={{ width: "200px", borderColor: "#AEAEAE" }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="text-start">
                      {selectedOption2 || "Välj elev"}
                    </div>
                    <div
                      className={`text-end icon ${isFlipped2 ? "flipped" : ""}`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 122 67"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.34044 1.65394C8.48525 0.703841 10.1534 0.736259 11.2605 1.73012L61 46.3846L110.74 1.73012C111.847 0.736257 113.515 0.703842 114.66 1.65394L120.39 6.40989C121.777 7.56077 121.843 9.66588 120.532 10.9018L61 67L1.4683 10.9018C0.156766 9.66588 0.223089 7.56077 1.60982 6.40989L7.34044 1.65394Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Display the selected option or default text */}
                </button>
                {isOpen2 && (
                  <ul className="dropdown-menu rounded-2">
                    <li onClick={() => handleOptionClick2("Paul Kittensberg")}>
                      Paul Kittensberg
                    </li>
                    <li onClick={() => handleOptionClick2("Mark Suckerberg")}>
                      Mark Suckerberg
                    </li>
                    <li onClick={() => handleOptionClick2("Jonas Lindström")}>
                      Jonas Lindström
                    </li>
                    {/* Add more menu items as needed */}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
