import React, { useState, useEffect } from "react";
import axios from "axios";
import getAuthHeaders from "../api/getAuthHeaders.tsx";
import defaultimage from "../assets/default.png";
import { Link } from "react-router-dom"; // Import useHistory
import Button from "./props/Button.tsx";

function RightSidebar({ user }) {
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://194.71.0.30:8000/api/show-own-class",
        {
          headers: getAuthHeaders(),
        }
      );
      setClasses(response.data.classes);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  async function fetchAttendanceData() {
    try {
      const response = await axios.get(
        "http://194.71.0.30:8000/api/getAttendanceStatus",
        {
          headers: getAuthHeaders(),
        }
      );
      setAttendance(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchData();
      fetchAttendanceData();
    }
  }, [user]);

  function getBorderColorForStudent(studentUUID: any) {
    const status = getStatusForStudent(studentUUID);
    switch (status) {
      case "Approved":
        return "#24E04D"; // Green border for Approved
      case "Rejected":
        return "#EB2828"; // Red border for Rejected
      case "Pending":
        return "#EBC028"; // Yellow border for Pending
      default:
        return "#ffffff"; // Default border color if status is not available (Blue)
    }
  }

  function getStatusForStudent(studentUUID) {
    if (
      attendance &&
      attendance.approved &&
      attendance.rejected &&
      attendance.pending
    ) {
      const approvedStudent = attendance.approved.find(
        (entry) => entry.student_uuid === studentUUID
      );
      if (approvedStudent) {
        return "Approved";
      }

      const rejectedStudent = attendance.rejected.find(
        (entry) => entry.student_uuid === studentUUID
      );
      if (rejectedStudent) {
        return "Rejected";
      }

      const pendingStudent = attendance.pending.find(
        (entry) => entry.student_uuid === studentUUID
      );
      if (pendingStudent) {
        return "Pending";
      }
    }

    return "Status not available";
  }

  const renderRoleContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      return <p>User not available.</p>;
    }

    const uniqueTeachers = {}; // To track unique teachers

    const roleID = user.user.roleId;
    switch (roleID) {
      case 1:
        return (
          <div className="rightsidebar">
            <p>Admin</p>
            <p>Placeholder</p>
            {/* Admin-specific content */}
          </div>
        );

      case 2: // Supervisor
        return (
          <div>
            <h2>Teachers</h2>
            {classes.length > 0 ? (
              <ul>
                {classes.map((classItem) => {
                  const teacher = classItem.teacher;
                  const teacherUUID = teacher.uuid;

                  // Check if this teacher has been rendered already
                  if (!uniqueTeachers[teacherUUID]) {
                    // Mark this teacher as rendered
                    uniqueTeachers[teacherUUID] = true;

                    return (
                      <li key={teacherUUID}>
                        <img
                          src={teacher.profile_picture}
                          className="rounded-circle"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          alt="Teacher Profile"
                        />
                        <p>
                          {teacher.first_name} {teacher.last_name}
                        </p>
                      </li>
                    );
                  } else {
                    // This teacher has already been rendered, skip
                    return null;
                  }
                })}
              </ul>
            ) : (
              <p>No unique teachers available.</p>
            )}

            <h2>Students</h2>
            {classes.length > 0 ? (
              <ul>
                {classes
                  .flatMap((classItem) => classItem.students)
                  .map((student) => (
                    <Link to={`/?user=${student.uuid}`}>
                      <li key={student.uuid}>
                        <img
                          src={
                            student.profile_picture
                              ? student.profile_picture
                              : defaultimage
                          }
                          className="rounded-circle profile"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          alt="Student Profile"
                        />
                        <p>
                          {student.first_name} {student.last_name} -{" "}
                          {student.classname}
                        </p>
                      </li>
                    </Link>
                  ))}
              </ul>
            ) : (
              <p>No students available.</p>
            )}
          </div>
        );

      case 3: // Teacher
        return (
          <div>
            <h2>Dina Klasser</h2>
            {classes.length > 0 ? (
              <>
                {classes.map((classItem) => (
                  <li key={classItem.classid}>
                    <div className="pb-3">
                      <div className="border border-dark-subtle rounded-1">
                        <li className="border-bottom p-2">
                          <span>{classItem.classname}</span>
                        </li>
                        {classItem.students.map((student) => (
                          <li key={student.uuid}>
                            <Link
                              className="text-decoration-none"
                              to={`/?class=${classItem.classid}&user=${student.uuid}`}
                            >
                              <li
                                className={`p-2 border-5`}
                                style={{
                                  borderLeft: "solid",
                                  borderColor: `${getBorderColorForStudent(
                                    student.uuid
                                  )}`,
                                }}
                              >
                                <div className="profile d-flex justify-content-between">
                                  <img
                                    src={
                                      student.profile_picture
                                        ? student.profile_picture
                                        : defaultimage
                                    }
                                    className="rounded-circle"
                                    style={{ width: "50px" }}
                                    loading="lazy"
                                  />

                                  <span className="text-dark">
                                    {`${student.first_name} ${student.last_name}`
                                      .length > 32
                                      ? `${student.first_name.slice(
                                          0,
                                          32
                                        )} ${student.last_name.slice(0, 1)}`
                                      : `${student.first_name} ${student.last_name}`}
                                  </span>
                                </div>
                              </li>
                              <li className="border-top"></li>
                            </Link>
                          </li>
                        ))}
                        <li className="p-2"></li>
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <p>No classes available.</p>
            )}
          </div>
        );

      case 4: // Student
        return (
          <div className="overflow0">
            <div>
              <h2>Din Klass</h2>
              {classes.length > 0 ? (
                <>
                  {classes.map((classItem) => (
                    <li key={classItem.classid}>
                      <div>
                        <div className="border border-dark-subtle rounded-1">
                          <li className="border-bottom p-2">
                            <span>{classItem.classname}</span>
                          </li>
                          <li className="p-2">
                            <div className="profile">
                              <img
                                src={classItem.teacher.profile_picture}
                                className="rounded-circle"
                                style={{ width: "50px" }}
                                loading="lazy"
                              />

                              <span className="text-dark">
                                {classItem.teacher.first_name}{" "}
                                {classItem.teacher.last_name}
                              </span>
                            </div>
                          </li>
                          <li className="border-top p-2"></li>
                          <li className="border-top"></li>
                          <div className="overflow">
                            {classItem.students.map((student) => (
                              <li key={student.uuid}>
                                <li className="p-2 border-start border-5 border-success">
                                  <div className="profile">
                                    <img
                                      src={
                                        student.profile_picture
                                          ? student.profile_picture
                                          : defaultimage
                                      }
                                      className="rounded-circle"
                                      style={{ width: "50px" }}
                                      loading="lazy"
                                    />

                                    <span className="text-dark">
                                      {student.first_name} {student.last_name}
                                    </span>
                                  </div>
                                </li>
                                <li className="border-top"></li>
                              </li>
                            ))}
                          </div>
                          <li className="p-2"></li>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <p>No classes available.</p>
              )}
            </div>
            <div>
              <h2>Din Praktikplats</h2>
              <div className="pb-3">
                <div className="border border-dark-subtle rounded-1">
                  <span>GTkonsult</span>
                  <Button
                    text={`Klick här`}
                    onClick={undefined}
                    style={{ background: "#2b3034" }}
                    className={`rounded-0 text-white fw-semibold w-100`}
                    disabled={undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <p>Error</p>;
    }
  };

  return <div className="Sidebar  p-3">{renderRoleContent()}</div>;
}

export default RightSidebar;
