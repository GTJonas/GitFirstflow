export function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <button onClick={props.onClose}>⬅</button>
      </div>
    </div>
  );
}

import "./popups.css";

export function CreatePostPopup(props) {
  return (
    <>
      <div className="createpost-background" onClick={props.closeOnClick}></div>
      <div className="createpost-popup">
        <div className="d-flex">
          <div className="media-body ml-3 flex-fill">
            <form onSubmit={props.onSubmit}>
              <textarea
                placeholder={props.textareaPlaceholder}
                value={props.textareaValue}
                onChange={props.textareaOnChange}
                className="rounded"
                id="postTextarea"
              ></textarea>
              <div className="upload">
                <input
                  type={props.postPictureTypeInput}
                  accept={props.postPictureAccept}
                  onChange={props.postPictureOnChange}
                  style={props.postPictureStyle} // Hide the file input element
                  ref={props.postPictureRef} // Connect the ref to the file input element
                />
                <button
                  type={props.postPictureTypeButton}
                  onClick={props.postPictureOnClick}
                  className="postPicture"
                >
                  {props.postPictureLabel}
                </button>
              </div>
              <div className="time">
                <div className="dropdown">
                  <button
                    onClick={props.timeOnClickfrom} // This is correct for handling the click event
                    className="dropdown-button rounded-2 border-1 btn"
                    style={{ width: "200px", borderColor: "#AEAEAE" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="text-start">
                        {props.timeSelectedOptionfrom || props.timeLabelfrom}
                      </div>
                      <div
                        className={`text-end icon ${
                          props.timeIsFlippedfrom ? "flipped" : ""
                        }`}
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
                  </button>
                  {props.timeIsOpenfrom && (
                    <ul className="dropdown-menu rounded-2 overflow-auto dropmenu">
                      {props.timeOptionsfrom.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => props.timeIsOpenOnClickfrom(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="dropdown">
                  <button
                    onClick={props.timeOnClickto} // This is correct for handling the click event
                    className="dropdown-button rounded-2 border-1 btn"
                    style={{ width: "200px", borderColor: "#AEAEAE" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="text-start">
                        {props.timeSelectedOptionto || props.timeLabelto}
                      </div>
                      <div
                        className={`text-end icon ${
                          props.timeIsFlippedto ? "flipped" : ""
                        }`}
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
                  </button>
                  {props.timeIsOpento && (
                    <ul className="dropdown-menu rounded-2 overflow-auto dropmenu">
                      {props.timeOptionsto.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => props.timeIsOpenOnClickto(option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <button type={props.createType}>{props.createLabel}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export function EditClassPopup(props) {
  return (
    <>
      <div className="editclass-background" onClick={props.closeOnClick}></div>
      <div className="editclass-popup">
        <h2>{props.classTitle}</h2>
        <p>{props.classCreated}</p>
        <div>
          {props.students}
          <div className="border-top d-flex justify-content-between">
            <p className="pTag">{props.studentName}</p>
            <div className="editclass-dropdown">
              <button
                onClick={props.onClick} // This is correct for handling the click event
                className="editclass-dropdown-toggle rounded-2 border-1 btn"
                style={{ width: "200px", borderColor: "#AEAEAE" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="text-start">
                    {props.selectedOption || props.label}
                  </div>
                  <div
                    className={`text-end icon ${
                      props.isFlipped ? "flipped" : ""
                    }`}
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
              </button>
              {props.isOpen && (
                <ul className="editclass-dropdown-menu rounded-2 overflow-auto dropmenu">
                  {props.options.map((option, index) => (
                    <li key={index} onClick={() => props.isOpenOnClick(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="m-2 py-1 px-4 border-0 rounded-2"
              style={{ background: "#EC2146", color: "#fff" }}
            >
              {props.studentRemove}
            </button>
          </div>
          <div className="border-bottom"></div>
        </div>
        <form onSubmit="">
          <h4>Skapa klass regel</h4>
          <span>Redovisnings dagar</span>
          <div className="p-2 editclass-inputmain">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <label key={day}>
                  <input
                    className="ms-2 me-1 editclass-input"
                    type="checkbox"
                    name={day}
                  />
                  {day}
                </label>
              )
            )}
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="m-2 py-1 px-4 border-0 rounded-2"
              style={{ background: "#0FA3F5", color: "#fff" }}
              type="submit"
            >
              Uppdatera
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
