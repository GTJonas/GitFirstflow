import React, { useEffect, useState } from "react";
import { fetchStudentsBySchool, showOwnClass } from "../../api/api.tsx";
import { SchoolClassHTML } from "./SchoolClassHTML.tsx";
import { SchoolClassPopup } from "./SchoolClassPopup.tsx";

const SchoolClass = () => {
  const [classDetailsList, setClassDetailsList] = useState([]);
  const [students, setStudents] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null); // Store the selected class

  useEffect(() => {
    async function fetchData() {
      try {
        const classDetailsResponse = await showOwnClass();
        const classDetails = classDetailsResponse.classes;
        setClassDetailsList(classDetails);

        if (classDetails.length > 0) {
          const schoolId = classDetails[0].teacher.school_id;
          const studentsFromSchool = await fetchStudentsBySchool(schoolId);
          setStudents(studentsFromSchool);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handlePopup = (classDetails: React.SetStateAction<null>) => {
    setSelectedClass(classDetails); // Store the selected class for editing
    setPopupVisible(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const options = ["GTkonsult"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFlipped(!isFlipped); // Toggle the flip animation
  };

  const handleOptionClick = (option: string | null) => {
    setSelectedOption(option as React.SetStateAction<null>);
    setIsOpen(false);
    setIsFlipped(false);
  };

  return (
    <>
      <SchoolClassHTML
        classDetailsList={classDetailsList}
        handlePopup={handlePopup}
      />
      {isPopupVisible && selectedClass && (
        <SchoolClassPopup
          setPopupVisible={setPopupVisible}
          students={students}
          selectedOption={selectedOption}
          isFlipped={isFlipped}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
          options={options}
          handleOptionClick={handleOptionClick}
        />
      )}
    </>
  );
};

export default SchoolClass;
