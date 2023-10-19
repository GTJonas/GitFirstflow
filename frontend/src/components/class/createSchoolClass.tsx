import { useState } from "react";
import { createClass } from "../../api/api";

const CreateClassPage = () => {
  const [className, setClassName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const classData = { class_name: className };
      const response = await createClass(classData);
      setSuccessMessage(response.message);
      setClassName(""); // Clear the input
      window.location.reload();
    } catch (error) {
      setErrorMessage("An error occurred while creating the class.");
      console.error(error);
    }
  };
  return (
    <div className="bg-white rounded-4 create-class-main">
      <h2>Skapa klass</h2>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="p-2 w-100">
            <input
              className="btn text-start w-100 rounded-3 px-2 py-1"
              style={{ borderColor: "#C0C0C0", background: "#f4f5f5" }}
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Klass namn"
            />
          </div>
          <div className="p-3 flex-shrink-1" style={{ width: "20%" }}>
            <button
              className="px-4 py-1 border-0 rounded-2"
              style={{ background: "#0FA3F5", color: "#fff" }}
              type="submit"
            >
              Skapa
            </button>
          </div>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CreateClassPage;
