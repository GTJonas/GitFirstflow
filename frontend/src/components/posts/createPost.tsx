import { useEffect, useRef, useState } from "react";
import { createPost } from "../../api/api";
import Button from "../props/Button";
import { CreatePostPopup } from "../props/Popups";

const CreatePost = ({ user }) => {
  const [content, setContent] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isTabletViewport, setIsTabletViewport] = useState(false); // Add tablet viewport state
  const [isLoaded, setIsLoaded] = useState(false);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const [isOpenFrom, setIsOpenFrom] = useState(false);
  const [selectedOptionFrom, setSelectedOptionFrom] = useState(null);
  const [isFlippedFrom, setIsFlippedFrom] = useState(false);
  const [isOpenTo, setIsOpenTo] = useState(false);
  const [selectedOptionTo, setSelectedOptionTo] = useState(null);
  const [isFlippedTo, setIsFlippedTo] = useState(false);

  const timeOptions = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const toggleDropdownFrom = () => {
    setIsOpenFrom(!isOpenFrom);
    setIsFlippedFrom(!isFlippedFrom); // Toggle the flip animation
  };

  const handleOptionClickFrom = (option) => {
    setSelectedOptionFrom(option);
    setIsOpenFrom(false);
    setIsFlippedFrom(false);
  };

  const toggleDropdownTo = () => {
    setIsOpenTo(!isOpenTo);
    setIsFlippedTo(!isFlippedTo); // Toggle the flip animation
  };

  const handleOptionClickTo = (option) => {
    setSelectedOptionTo(option);
    setIsOpenTo(false);
    setIsFlippedTo(false);
  };

  // Ref for the file input element
  const fileInputRef = useRef(null);

  // Handle window resize event
  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= 640);
      setIsTabletViewport(window.innerWidth <= 1024); // Set tablet viewport width as needed
    };

    // Add an event listener to check when the entire page is loaded
    window.onload = () => {
      setIsLoaded(true); // Set isLoaded to true when everything is loaded
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.onload = null;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate the content field
    if (!content) {
      setError("Content field is required.");
      return;
    }

    // Create a form data object to send the image along with other data
    const formData = new FormData();
    formData.append("content", content);
    formData.append("from", from);
    formData.append("to", to);

    if (image instanceof File) {
      formData.append("image", image);
    }

    // Check if the user is in the desired class or company
    const userIsInClass = user.user.class_id !== null;
    const userIsInCompany = user.user.company_uuid !== null;

    if (!userIsInClass) {
      setError("You are not in the required class.");
      return;
    }

    if (!userIsInCompany) {
      setError("You are not in the required company.");
      return;
    }

    // Send the request to create the post using the createPost function from the api.tsx file
    createPost(formData)
      .then((response) => {
        setSuccess(true);
        setContent("");
        setImage(null);
        setFrom("");
        setTo("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error from backend:", error); // Log the error for debugging
        setError("Du kan tyvärr inte skapa ett inlägg idag.");
      })
      .finally(() => {
        // Set isCreatingPost to false when the request is complete
        setIsCreatingPost(false);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChooseImageClick = () => {
    // Trigger the file input click event when the button is clicked
    fileInputRef.current.click();
  };

  const handlePopup = () => {
    // Show the popup
    setPopupVisible(true);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // Function to auto-expand textarea
  const autoExpandTextarea = () => {
    const textarea = document.getElementById("postTextarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoExpandTextarea();
  }, [textareaValue]);

  const handleContentTextarea = (e) => {
    handleContent(e);
    autoExpandTextarea();
  };

  if (isMobileViewport) {
    return (
      <div className="bg-white">
        <p className="ps-3">
          <div className="d-flex">
            <img
              src={user.user.profilePicture}
              className="rounded-circle img-fluid img-md"
              alt=""
              loading="lazy"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <div className="media-body ml-3 ps-2 pe-3 flex-fill">
              <Button
                text={`Vad har du gjort idag?`}
                onClick={handlePopup}
                style={undefined}
                className={`rounded-pill mt-2 border border-dark-subtle text-start ps-2`}
                disabled={undefined}
              ></Button>
            </div>
          </div>
        </p>

        {isPopupVisible && (
          <CreatePostPopup
            closeOnClick={() => setPopupVisible(false)} // Close the popup when the "close" button is clicked
            onSubmit={handleSubmit}
            textareaPlaceholder="Vad har du gjort idag?"
            textareaValue={content}
            textareaOnChange={handleContentTextarea} // Use a simpler function signature
            postPictureTypeInput="file"
            postPictureAccept="image/*"
            postPictureOnChange={handleImageChange}
            postPictureStyle={{ display: "none" }}
            postPictureRef={fileInputRef}
            postPictureTypeButton="button"
            postPictureOnClick={handleChooseImageClick}
            postPictureLabel="Ladda upp bild"
            timeLabelfrom={`Från`}
            timeOnClickfrom={toggleDropdownFrom} // Corrected function name
            timeSelectedOptionfrom={selectedOptionFrom} // Corrected prop name
            timeIsFlippedfrom={isFlippedFrom} // Corrected prop name¨
            timeIsOpenfrom={isOpenFrom}
            timeOptionsfrom={timeOptions}
            timeIsOpenOnClickfrom={handleOptionClickFrom} // Corrected function name
            timeLabelto={`Till`}
            timeOnClickto={toggleDropdownTo} // Corrected function name
            timeSelectedOptionto={selectedOptionTo} // Corrected prop name
            timeIsFlippedto={isFlippedTo} // Corrected prop name
            timeIsOpento={isOpenTo}
            timeOptionsto={timeOptions}
            timeIsOpenOnClickto={handleOptionClickTo} // Corrected function name
            createType={`submit`}
            createLabel={`Skapa inlägg`}
          />
        )}
      </div>
    );
  } else if (isTabletViewport) {
    return (
      <div className="bg-white">
        <p className="ps-3">
          <div className="d-flex">
            <img
              src={user.user.profilePicture}
              className="rounded-circle img-fluid img-md"
              alt=""
              loading="lazy"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <div className="media-body ml-3 ps-2 pe-3 flex-fill">
              <Button
                text={`Vad har du gjort idag?`}
                onClick={handlePopup}
                style={undefined}
                className={`rounded-pill mt-2 border border-dark-subtle text-start ps-2`}
                disabled={undefined}
              ></Button>
            </div>
          </div>
        </p>
        {isPopupVisible && (
          <CreatePostPopup
            closeOnClick={() => setPopupVisible(false)} // Close the popup when the "close" button is clicked
            textareaPlaceholder="Vad har du gjort idag?"
            textareaValue={content}
            textareaOnChange={handleContentTextarea} // Use a simpler function signature
            postPictureTypeInput="file"
            postPictureAccept="image/*"
            postPictureOnChange={handleImageChange}
            postPictureStyle={{ display: "none" }}
            postPictureRef={fileInputRef}
            postPictureTypeButton="button"
            postPictureOnClick={handleChooseImageClick}
            postPictureLabel="Ladda upp bild"
            timeLabelfrom={`Från`}
            timeOnClickfrom={toggleDropdownFrom} // Corrected function name
            timeSelectedOptionfrom={selectedOptionFrom} // Corrected prop name
            timeIsFlippedfrom={isFlippedFrom} // Corrected prop name¨
            timeIsOpenfrom={isOpenFrom}
            timeOptionsfrom={timeOptions}
            timeIsOpenOnClickfrom={handleOptionClickFrom} // Corrected function name
            timeLabelto={`Till`}
            timeOnClickto={toggleDropdownTo} // Corrected function name
            timeSelectedOptionto={selectedOptionTo} // Corrected prop name
            timeIsFlippedto={isFlippedTo} // Corrected prop name
            timeIsOpento={isOpenTo}
            timeOptionsto={timeOptions}
            timeIsOpenOnClickto={handleOptionClickTo} // Corrected function name
            createLabel={`Skapa inlägg`}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="my-3 bg-white rounded">
        <p className="ps-3">
          <div className="d-flex">
            <img
              src={user.user.profilePicture}
              className="rounded-circle img-fluid img-md"
              alt=""
              loading="lazy"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <div className="media-body ml-3 ps-2 pe-3 flex-fill">
              <Button
                text={`Vad har du gjort idag?`}
                onClick={handlePopup} // Call handleChooseImageClick when the button is clicked
                style={{ padding: "10px 360px 10px 100px" }}
                className={`rounded-pill mt-2 border border-dark-subtle text-start ps-2`}
                disabled={undefined}
              ></Button>
            </div>
          </div>
        </p>
        {/* Conditionally render the popup based on the isPopupVisible state */}
        {isPopupVisible && (
          <CreatePostPopup
            closeOnClick={() => setPopupVisible(false)} // Close the popup when the "close" button is clicked
            textareaPlaceholder="Vad har du gjort idag?"
            textareaValue={content}
            textareaOnChange={handleContentTextarea} // Use a simpler function signature
            postPictureTypeInput="file"
            postPictureAccept="image/*"
            postPictureOnChange={handleImageChange}
            postPictureStyle={{ display: "none" }}
            postPictureRef={fileInputRef}
            postPictureTypeButton="button"
            postPictureOnClick={handleChooseImageClick}
            postPictureLabel="Ladda upp bild"
            timeLabelfrom={`Från`}
            timeOnClickfrom={toggleDropdownFrom} // Corrected function name
            timeSelectedOptionfrom={selectedOptionFrom} // Corrected prop name
            timeIsFlippedfrom={isFlippedFrom} // Corrected prop name¨
            timeIsOpenfrom={isOpenFrom}
            timeOptionsfrom={timeOptions}
            timeIsOpenOnClickfrom={handleOptionClickFrom} // Corrected function name
            timeLabelto={`Till`}
            timeOnClickto={toggleDropdownTo} // Corrected function name
            timeSelectedOptionto={selectedOptionTo} // Corrected prop name
            timeIsFlippedto={isFlippedTo} // Corrected prop name
            timeIsOpento={isOpenTo}
            timeOptionsto={timeOptions}
            timeIsOpenOnClickto={handleOptionClickTo} // Corrected function name
            createLabel={`Skapa inlägg`}
          />
        )}
      </div>
    );
  }
};

export default CreatePost;
