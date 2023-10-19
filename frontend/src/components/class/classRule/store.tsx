import { useState, useEffect } from "react";
import { checkAndUpdateClassRule, showOwnClass } from "../../../api/api";

type ClassItem = {
  classid: number;
  classname: string;
};

const ClassRuleStore = () => {
  // State to store the form data
  const [formData, setFormData] = useState<{
    class_id: number | null;
    days_allowed: number[];
  }>({
    class_id: null,
    days_allowed: [],
  });

  // State to store the list of classes
  const [classes, setClasses] = useState<ClassItem[]>([]);

  // Fetch the list of classes and the teacher's class ID when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const ownClass = await showOwnClass();
        const { classes } = ownClass; // Extract the classes array from the response
        setClasses(classes); // Set the classes state with the array of classes

        // Set the initial class_id to the first class in the array
        if (classes.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            class_id: classes[0].classid, // Assuming classid is the class ID property
          }));
        }
      } catch (error) {
        console.error("Error fetching class ID:", error);
      }
    }

    fetchData();
  }, []); // Run once when the component mounts

  const resetForm = () => {
    setFormData({
      class_id: null,
      days_allowed: [],
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const daysAllowedString = formData.days_allowed.join(",");
    const classId = formData.class_id; // Ensure that class_id is correctly set in formData

    // Check if a rule already exists
    checkAndUpdateClassRule({
      class_id: classId, // Pass class_id in the request
      days_allowed: daysAllowedString,
    })
      .then((response) => {
        console.log("Class rule created/updated:", response.data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error creating/updating class rule:", error);
      });
  };

  const handleCheckboxChange = (day: number) => {
    setFormData((prevData) => {
      // Toggle the selected day in the array
      if (prevData.days_allowed.includes(day)) {
        return {
          ...prevData,
          days_allowed: prevData.days_allowed.filter((d) => d !== day),
        };
      } else {
        return {
          ...prevData,
          days_allowed: [...prevData.days_allowed, day],
        };
      }
    });
  };

  // Function to handle class ID dropdown selection
  const handleClassIdChange = (e: { target: { value: string } }) => {
    const selectedClassId = parseInt(e.target.value); // Convert the selected value to an integer
    setFormData((prevData) => ({
      ...prevData,
      class_id: selectedClassId,
    }));
  };

  console.log(formData.class_id);

  return (
    <div>
      <h2>Create Class Rule</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown menu for selecting class_id */}
        <div>
          <label htmlFor="class_id">Class ID:</label>
          <select
            id="class_id"
            name="class_id"
            value={formData.class_id || ""}
            onChange={handleClassIdChange}
          >
            {classes.map((classItem) => (
              <option key={classItem.classid} value={classItem.classid}>
                {classItem.classname} - {classItem.classid}{" "}
                {/* Display both class name and ID */}
              </option>
            ))}
          </select>
        </div>
        {/* Checkboxes for selecting days */}
        <div>
          <label>Days Allowed:</label>
          <div>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    name={day}
                    checked={formData.days_allowed.includes(day as any)}
                    onChange={() => handleCheckboxChange(day as any)}
                  />{" "}
                  {day}
                </label>
              )
            )}
          </div>
        </div>
        <button type="submit">Create/Update</button>
      </form>
    </div>
  );
};

export default ClassRuleStore;
