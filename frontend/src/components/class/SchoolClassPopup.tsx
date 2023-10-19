import "./class.css";
import "../../assets/Icons/Icons.css";
import { Div } from "../props/Div.tsx";
import { Tags } from "../props/Tags.tsx";
import "../props/dropdown.css";
import Button from "../props/Button.tsx";
import { Form } from "../props/Form.tsx";
export function SchoolClassPopup(html: {
  setPopupVisible: any;
  students: any;
  selectedOption: any;
  isFlipped: any;
  isOpen: any;
  toggleDropdown: any;
  options: any;
  handleOptionClick: any;
}) {
  const setPopupVisible = html.setPopupVisible;
  const students = html.students;
  const selectedOption = html.selectedOption;
  const isFlipped = html.isFlipped;
  const isOpen = html.isOpen;
  const toggleDropdown = html.toggleDropdown;
  const options = html.options;
  const handleOptionClick = html.handleOptionClick;

  selectedOption;

  return (
    <>
      <Div
        className={`close-background`}
        onClick={() => setPopupVisible(false)}
        content={undefined}
        style={undefined}
      />
      <Div
        className={`popup rounded-4`}
        onClick={undefined}
        content={
          <>
            <Div
              className={`d-flex justify-content-end`}
              content={
                <Button
                  className={`icon-close`}
                  content={undefined}
                  onClick={undefined}
                  style={undefined}
                  disabled={undefined}
                />
              }
              onClick={() => setPopupVisible(false)}
              style={undefined}
            ></Div>

            <Tags
              tag={`h2`}
              content={`EE20`}
              key={undefined}
              className={undefined}
              onClick={undefined}
              loading={undefined}
              src={undefined}
            />
            <Tags
              tag={`p`}
              content={`Skapad av Stefan Näslund`}
              key={undefined}
              className={undefined}
              onClick={undefined}
              loading={undefined}
              src={undefined}
            />
            <Div
              className={`border-top`}
              content={
                <>
                  {students.map(
                    (student: {
                      id: any;
                      first_name: string;
                      last_name: string;
                    }) => (
                      <>
                        <Div
                          className={`d-flex justify-content-between w-100`}
                          content={
                            <>
                              <Div
                                content={
                                  <>
                                    <Tags
                                      tag={`p`}
                                      key={student.id}
                                      content={
                                        student.first_name +
                                        " " +
                                        student.last_name
                                      }
                                      className={undefined}
                                      onClick={undefined}
                                      loading={undefined}
                                      src={undefined}
                                    />
                                  </>
                                }
                                className={undefined}
                                onClick={undefined}
                                style={undefined}
                              />
                              <Div
                                className={`dropdown`}
                                content={
                                  <>
                                    <Button
                                      content={
                                        <>
                                          <Div
                                            className={`d-flex justify-content-between`}
                                            content={
                                              <>
                                                <Div
                                                  className={`text-start`}
                                                  content={
                                                    <>
                                                      {selectedOption ||
                                                        "Välj praktikplats"}
                                                    </>
                                                  }
                                                  onClick={undefined}
                                                  style={undefined}
                                                />
                                                <Div
                                                  className={`text-end icon ${
                                                    isFlipped ? "flipped" : ""
                                                  }`}
                                                  content={
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
                                                  }
                                                  onClick={undefined}
                                                  style={undefined}
                                                />
                                              </>
                                            }
                                            onClick={undefined}
                                            style={undefined}
                                          />
                                        </>
                                      }
                                      onClick={toggleDropdown}
                                      style={{
                                        width: "200px",
                                        borderColor: "#AEAEAE",
                                      }}
                                      className={`dropdown-toggle rounded-2 border border-1 internship`}
                                      disabled={undefined}
                                    />
                                    {isOpen && (
                                      <Tags
                                        tag={`ul`}
                                        content={
                                          <>
                                            {options.map(
                                              (option: any, index: any) => (
                                                <>
                                                  <Tags
                                                    tag={`li`}
                                                    key={index}
                                                    onClick={() =>
                                                      handleOptionClick(option)
                                                    }
                                                    content={option}
                                                    className={undefined}
                                                    loading={undefined}
                                                    src={undefined}
                                                  />
                                                </>
                                              )
                                            )}
                                          </>
                                        }
                                        key={undefined}
                                        className={undefined}
                                        onClick={undefined}
                                        loading={undefined}
                                        src={undefined}
                                      />
                                    )}
                                  </>
                                }
                                onClick={undefined}
                                style={undefined}
                              />
                              <Button
                                className={`m-2 py-1 px-4 border-0 rounded-2`}
                                style={{
                                  background: "#EC2146",
                                  color: "#fff",
                                }}
                                content={`Ta bort`}
                                onClick={undefined}
                                disabled={undefined}
                              />
                            </>
                          }
                          onClick={undefined}
                          style={undefined}
                        />
                        <Div
                          className={`border-bottom`}
                          content={undefined}
                          onClick={undefined}
                          style={undefined}
                        />
                      </>
                    )
                  )}
                </>
              }
              onClick={undefined}
              style={undefined}
            />
            <Div
              className={``}
              content={
                <Form
                  onSubmit={undefined}
                  content={
                    <>
                      <Tags
                        tag={`h4`}
                        content={`Skapa klass regel`}
                        key={undefined}
                        className={undefined}
                        onClick={undefined}
                        loading={undefined}
                        src={undefined}
                      />
                      <Tags
                        tag={`span`}
                        content={`Redovisnings dagar`}
                        key={undefined}
                        className={undefined}
                        onClick={undefined}
                        loading={undefined}
                        src={undefined}
                      />
                      <Div
                        className={`p-2`}
                        content={
                          <>
                            {[
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                            ].map((day) => (
                              <label key={day}>
                                <input
                                  className="ms-2 me-1"
                                  type="checkbox"
                                  name={day}
                                />
                                {day}
                              </label>
                            ))}
                          </>
                        }
                        onClick={undefined}
                        style={undefined}
                      />
                      <Div
                        className={`d-flex justify-content-end`}
                        content={
                          <Button
                            className={`m-2 py-1 px-4 border-0 rounded-2`}
                            style={{ background: "#0FA3F5", color: "#fff" }}
                            type={`submit`}
                            content={`Uppdatera`}
                          />
                        }
                        onClick={undefined}
                        style={undefined}
                      />
                    </>
                  }
                  className={undefined}
                />
              }
              onClick={undefined}
              style={undefined}
            />
          </>
        }
        style={undefined}
      />
    </>
  );
}
