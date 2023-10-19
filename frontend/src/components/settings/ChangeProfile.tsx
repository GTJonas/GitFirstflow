import { useState, useEffect, useRef } from "react";
import {
  encryptData,
  decryptData,
  updateProfile,
  fetchApiUrls,
} from "../../api/api"; // Import your updateProfile function
import Button from "../props/Button";

interface User {
  user: any;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  roleId: number;
  schoolId: number;
  classId: number;
  companyUuid: string;
  // Add more properties as needed
}

const ChangeProfile: React.FC<{ user: User }> = ({ user }) => {
  const [uuid, setUuid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [classId, setClassId] = useState(null);
  const [companyUuid, setCompanyUuid] = useState(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [previewProfilePictureUrl, setPreviewProfilePictureUrl] = useState<
    string | null
  >(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isTabletViewport, setIsTabletViewport] = useState(false);

  console.log(user);

  // Ref for the file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Initialize as null

  // Fetch user's current profile data from localStorage and populate the form fields
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      try {
        // Attempt to decrypt the stored data
        const decryptedData = decryptData(storedUserData);

        // Check if the decrypted data is a valid JSON string
        if (isValidJSON(decryptedData)) {
          const userData = JSON.parse(decryptedData);
          setUuid(user.user.uuid);
          setFirstName(userData.user.first_name);
          setLastName(userData.user.last_name);
          setEmail(user.user.email);
          setRoleId(user.user.roleId);
          setSchoolId(user.user.schoolId);
          setClassId(user.user.classId);
          setCompanyUuid(user.user.companyUuid);
        } else {
          setError("Invalid user data format");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Error parsing user data");
      }
    }

    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= 640);
      setIsTabletViewport(window.innerWidth <= 1024); // Set tablet viewport width as needed
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function isValidJSON(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    // Validate form inputs
    if (!firstName || !lastName) {
      setError("First name and last name are required.");
      return;
    }

    // Generate a unique filename for the profile picture if it exists
    let profilePictureFileName = "";
    if (profilePicture) {
      const { storageUrls } = await fetchApiUrls();
      const url = storageUrls[0];
      const fileExtension = (profilePicture as File).name.split(".").pop();
      profilePictureFileName = `${url}${uuid}.${fileExtension}`;
    }

    // Create a form data object to send the updated profile data
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    // Append the profile picture with the unique filename if it exists
    if (profilePicture) {
      formData.append(
        "profile_picture",
        profilePicture,
        profilePictureFileName
      );
    }

    try {
      // Send the request to update the user's profile using the API module
      const response = await updateProfile(formData);
      console.log("Response:", response);

      if (response.status === 200) {
        // Merge the updated fields with the existing data
        const updatedUserData = {
          user: {
            uuid: uuid,
            first_name: firstName,
            last_name: lastName,
            email: email,
            roleId: roleId,
            profilePicture: profilePictureFileName,
            schoolId: schoolId,
            classId: classId,
            companyUuid: companyUuid,
          },
          // Add other profile data if needed
        };

        // Save the merged user data back to localStorage
        localStorage.setItem(
          "userData",
          encryptData(JSON.stringify(updatedUserData))
        );
        sessionStorage.removeItem("isReloaded");
      } else {
        setError("Failed to update profile. Please try again later.");
        console.error("Profile update failed. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again later.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Access the selected file using e.target.files[0]
      const selectedFile = e.target.files[0];

      // Create a URL for the selected image to preview it
      const imageUrl = URL.createObjectURL(selectedFile);

      // Set the previewProfilePictureUrl to the image URL
      setPreviewProfilePictureUrl(imageUrl);

      // Set the profile picture to the selected file
      setProfilePicture(selectedFile);
    }
  };

  const handleChooseImageClick = () => {
    // Use optional chaining to access the click method if fileInputRef.current exists
    fileInputRef.current!.click();
  };

  console.log(user.user);

  const viewPorts = () => {
    if (isMobileViewport) {
      return (
        <div
          className="bg-white mx-auto"
          style={{ padding: "30px 0", width: "100%" }}
        >
          <form onSubmit={handleSubmit} className="g-3">
            <div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <h2 style={{ fontSize: "35px", textAlign: "center" }}>
                Redigera profil
              </h2>
              <div className="py-3 d-flex justify-content-center">
                <div className="rounded-circle">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }} // Hide the file input element
                    ref={fileInputRef} // Connect the ref to the file input element
                  />
                  <div className="rounded-circle bg-black">
                    <img
                      src={previewProfilePictureUrl || user.user.profilePicture}
                      alt="Profile"
                      className="rounded-circle"
                      onClick={handleChooseImageClick}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        outlineStyle: "solid",
                        outlineColor: "#696969",
                        outlineWidth: "1px",
                        opacity: "70%",
                      }}
                    />
                    <p
                      onClick={handleChooseImageClick}
                      style={{
                        position: "absolute",
                        top: "35%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#FFFFFF",
                      }}
                    >
                      Byt bild
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-3 w-75 mx-auto">
                <label
                  htmlFor="inputFirst"
                  className=""
                  style={{ fontSize: "18px", margin: "0 10px" }}
                >
                  Förnamn
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="rounded-5"
                  style={{
                    background: "#f4f5f5",
                    borderColor: "#AEAEAE",
                    borderStyle: "solid",
                    height: "37px",
                    fontSize: "16px",
                  }}
                  id="inputFirst"
                />
              </div>
              <div className="col-md-12 mb-3 w-75 mx-auto">
                <label
                  htmlFor="inputLast"
                  className=""
                  style={{ fontSize: "18px", margin: "0 10px" }}
                >
                  Efternamn
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="rounded-5"
                  style={{
                    background: "#f4f5f5",
                    borderColor: "#AEAEAE",
                    borderStyle: "solid",
                    height: "37px",
                    fontSize: "16px",
                  }}
                  id="inputLast"
                />
              </div>
              <div className="col-md-12 mb-3 w-75 mx-auto">
                <label
                  htmlFor="inputEmail"
                  className=""
                  style={{ fontSize: "18px", margin: "0 10px" }}
                >
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-5"
                  style={{
                    background: "#f4f5f5",
                    borderColor: "#AEAEAE",
                    borderStyle: "solid",
                    height: "37px",
                    fontSize: "16px",
                  }}
                  id="inputEmail"
                />
              </div>

              <div className="d-flex justify-content-end">
                <Button
                  className={`border-0 rounded-5 w-50 mx-auto`}
                  style={{
                    background: "#0FA3F5",
                    color: "#FFFFFF",
                  }}
                  content={
                    <p
                      style={{
                        margin: "0 0 0 0",
                        fontSize: "22px",
                        fontWeight: "600",
                      }}
                    >
                      Uppdatera
                    </p>
                  }
                  onClick={undefined}
                  disabled={undefined}
                  type={`submit`}
                />
              </div>
            </div>
          </form>
        </div>
      );
    }
  };

  return <>{viewPorts()}</>;
};

export default ChangeProfile;
