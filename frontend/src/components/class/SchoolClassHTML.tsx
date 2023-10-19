import "./class.css";
import { Div } from "../props/Div.tsx";
import { Tags } from "../props/Tags.tsx";
import Button from "../props/Button.tsx";
export function SchoolClassHTML(html: {
  classDetailsList: any;
  handlePopup: any;
}) {
  const classDetailsList = html.classDetailsList;
  const handlePopup = html.handlePopup;

  return (
    <>
      {Array.isArray(classDetailsList) &&
        classDetailsList.map((classDetails, classIndex) => (
          <Div
            className={`bg-white rounded-4 class`}
            key={classIndex}
            content={
              <>
                <Div
                  className={`d-flex`}
                  content={
                    <>
                      <Div
                        className={`p-2 w-100`}
                        content={
                          <Tags
                            tag={`h2`}
                            className={`classname`}
                            content={classDetails.classname}
                            key={undefined}
                            onClick={undefined}
                            loading={undefined}
                            src={undefined}
                          />
                        }
                        onClick={undefined}
                        style={undefined}
                      />
                      <Div
                        className={`d-flex buttdiv`}
                        content={
                          <>
                            <Div
                              content={
                                <Button
                                  className={`edit`}
                                  onClick={() => handlePopup(classDetails)}
                                  content={<i className={`icon-edit`}></i>}
                                  style={undefined}
                                  disabled={undefined}
                                />
                              }
                              className={undefined}
                              onClick={undefined}
                              style={undefined}
                            />
                            <Tags
                              tag={`p`}
                              className={`p-1`}
                              key={undefined}
                              content={undefined}
                              onClick={undefined}
                              loading={undefined}
                              src={undefined}
                            />
                            <Div
                              content={
                                <Button
                                  className={`remove-bin`}
                                  onClick={handlePopup}
                                  content={<i className={`icon-bin`}></i>}
                                  style={undefined}
                                  disabled={undefined}
                                />
                              }
                              className={undefined}
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
                  onClick={undefined}
                  style={undefined}
                />
                <Tags
                  tag={`p`}
                  className={`teacher`}
                  content={`Skapad av ${classDetails.teacher.first_name}${" "}${
                    classDetails.teacher.last_name
                  }`}
                  key={undefined}
                  onClick={undefined}
                  loading={undefined}
                  src={undefined}
                />
                <Div
                  className={`d-flex user p-1`}
                  content={classDetails.students
                    .slice(0, 4)
                    .map(
                      (
                        student: { profile_picture: any },
                        studentIndex: any
                      ) => (
                        <Div
                          key={studentIndex}
                          content={
                            <Div
                              className="profile"
                              content={
                                <Tags
                                  tag={`img`}
                                  className={`rounded-circle`}
                                  src={student.profile_picture}
                                  loading={`lazy`}
                                  key={undefined}
                                  content={undefined}
                                  onClick={undefined}
                                />
                              }
                              onClick={undefined}
                              style={undefined}
                            />
                          }
                          className={undefined}
                          onClick={undefined}
                          style={undefined}
                        />
                      )
                    )}
                  onClick={undefined}
                  style={undefined}
                />
              </>
            }
            onClick={undefined}
            style={undefined}
          />
        ))}
    </>
  );
}
