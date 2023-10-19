import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChangeCompanyProfilePopup from "../../components/company/changeCompanyProfilePopup.tsx";
import CreateCompanyProfile from "../../components/company/createCompanyProfile.tsx";

import PlaceholderCompanylogo from "../../assets/company/company-picture.png";
import Placeholderbanner from "../../assets/company/banner.png";

function Company() {
  const { uuid } = useParams();
  const [companyData, setCompanyData] = useState<{
    loading: boolean;
    data: any;
  }>({
    loading: true,
    data: null,
  });
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    axios
      .get(`http://194.71.0.30:8000/api/company/show/${uuid}`)
      .then((response) => {
        setCompanyData((prevData) => ({
          ...prevData,
          loading: false,
          data: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching company profile:", error);
        setCompanyData((prevData) => ({
          ...prevData,
          loading: false,
          data: null,
        }));
      });
  }, [uuid]);

  if (companyData.loading) {
    return <div>Loading...</div>;
  }

  console.log(companyData.data);

  if (!companyData.data) {
    return (
      <div>
        <CreateCompanyProfile />
      </div>
    );
  } else {
    const { company, supervisor } = companyData.data;
    const supervisorName = supervisor
      ? `${supervisor.firstName} ${supervisor.lastName}`
      : "N/A";

    return (
      <>
        {supervisor ? (
          <div className="company">
            <div className="mt-4 bannerDiv">
              <img
                className={"Banner"}
                src={company.banner || Placeholderbanner}
                alt="Banner"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = Placeholderbanner;
                }}
              />
            </div>
            <div className={"CompanyBodyHead"}>
              <div className={"CompanyHeader d-flex p-3"}>
                <div>
                  <img
                    className={"Companylogo"}
                    src={company.profilePicture || PlaceholderCompanylogo}
                    alt="Company_Picture"
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      const target = e.target as HTMLImageElement;
                      target.src = PlaceholderCompanylogo;
                    }}
                  />
                </div>
                <div className="d-flex align-items-center p-2">
                  <div>
                    <h2
                      className="lh-1"
                      style={{
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#000000",
                      }}
                    >
                      {company.name}
                    </h2>
                    {company.category ? (
                      <p
                        className="lh-1"
                        style={{ fontSize: "18px", color: "#000000" }}
                      >
                        {company.category}
                      </p>
                    ) : (
                      <p>ingen arbetsamhet</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex1">
                <div className="d-md-block col-md-4 col-xl-4 my-4">
                  <div className="card rounded border-0">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="container-fluid row pt-3">
                          <div className="mb-3">
                            <img
                              style={{
                                objectFit: "cover",
                                height: "70px",
                                width: "70px",
                                borderRadius: "100%",
                              }}
                              src={supervisor.profileImage} // Use Placeholderbanner if company.banner is falsy
                            />
                          </div>
                          <h5
                            style={{
                              color: "#000000",
                            }}
                          >
                            Handledare
                          </h5>
                          <p
                            style={{
                              color: "#000000",
                            }}
                          >
                            {supervisorName}
                          </p>
                          <h5
                            style={{
                              color: "#000000",
                            }}
                          >
                            Email
                          </h5>
                          <p
                            style={{
                              color: "#000000",
                            }}
                          >
                            {supervisor.email}
                          </p>
                          {supervisor.phoneNumber ? (
                            <>
                              <h5
                                style={{
                                  color: "#fff",
                                }}
                              >
                                Telefonnummer
                              </h5>
                              <p
                                style={{
                                  color: "#fff",
                                }}
                              >
                                {supervisor.phoneNumber}
                              </p>
                            </>
                          ) : (
                            <p>00000</p>
                          )}

                          <div>
                            <a href="#" onClick={togglePopup}>
                              Hantera Företagsprofil
                            </a>
                            {showPopup && (
                              <ChangeCompanyProfilePopup
                                onClose={togglePopup}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-md-block col-md-4 col-xl-7 my-4 bio-card">
                  <div className="card rounded border-0 overflow-auto card1">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div>
                          {company.location ? (
                            <p
                              style={{
                                color: "#000000",
                              }}
                            >
                              {company.location}
                            </p>
                          ) : (
                            <p>Plats finns inte</p>
                          )}
                          {company.about ? (
                            <p
                              className="text-break overflow-auto"
                              style={{
                                color: "#000000",
                              }}
                            >
                              {company.about}
                            </p>
                          ) : (
                            <p>Om: Företaget har inte skrivit något</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Praktikplatsen existerar inte.</div>
        )}
      </>
    );
  }
}

export default Company;
