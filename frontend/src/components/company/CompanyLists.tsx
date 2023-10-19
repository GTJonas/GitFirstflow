import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Button from "../props/Button";
import "../../assets/Icons/Icons.css";
import { Link } from "react-router-dom";
import React from "react";
import "./companylists.css";

const API_URL = "http://194.71.0.30:8000";

type Company = {
  supervisor: any;
  url: any;
  company: any;
  // Add other properties as needed
};

interface FavoriteCompany {
  uuid: string;
  // other properties
}

function CompanyLists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<Company[] | null>(null); // Replace 'Company' with your actual company type
  const [favoriteCompanies, setFavoriteCompanies] = useState<FavoriteCompany[]>(
    []
  );

  const fetchCompanies = async (query: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/search-companies?query=${query}`
      );

      if (response.data.companies.length === 0) {
        setCompanies(null);
      } else {
        setCompanies(response.data.companies);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const favoriteCompany = async (companyId: any) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/favorite-company/${companyId}`,
        {},
        { headers }
      );
      // Handle the response data in the .then block
      responseHandler(response);
    } catch (error) {
      console.error("Error favoriting company:", error);
    }
  };

  const removeFavoriteCompany = async (companyId: any) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/remove-favorite-company/${companyId}`,
        {},
        { headers }
      );
      // Handle the response data in the .then block
      responseHandler(response);
    } catch (error) {
      console.error("Error removing favorite company:", error);
    }
  };

  // Create a separate function to handle the response
  const responseHandler = (response: AxiosResponse<any, any>) => {
    console.log("Response:", response);
    console.log(response.data.message);
    // Refresh the list of companies after removing from favorites
    fetchCompanies(searchQuery);
    // Refresh the list of favorite companies
    fetchFavoriteCompanies();
  };

  const fetchFavoriteCompanies = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/favorite-companies`, {
        headers,
      });
      setFavoriteCompanies(response.data);
    } catch (error) {
      console.error("Error fetching favorite companies:", error);
    }
  };

  useEffect(() => {
    fetchFavoriteCompanies();
    fetchCompanies(searchQuery);
  }, [searchQuery]);

  console.log(favoriteCompanies);

  return (
    <div className="company-lists">
      <div className="mb-3 padding">
        <label
          htmlFor="formGroupExampleInput"
          className="form-label search-label"
        >
          Sök efter företag
        </label>
        <input
          type="text"
          placeholder="Sök..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="search-main"
        />
      </div>

      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {companies !== null ? (
            companies.map((companyData, index) => (
              <React.Fragment key={index}>
                {companyData.company.name ? (
                  <div className="col company-main">
                    <div className="card border-0 rounded-4 mb-3 mx-auto company-card">
                      <div className="card rounded-4 border-0">
                        <Link
                          className="text-decoration-none"
                          to={companyData.url}
                        >
                          <div
                            className="card-header rounded-top-4"
                            style={{
                              background: "#E4E1F2",
                              color: "#4F2DD7",
                              padding: "5px 0 5px 11px",
                              fontSize: "16px",
                              fontWeight: "600",
                              letterSpacing: ".5px",
                            }}
                          >
                            {companyData.company.category}
                          </div>
                        </Link>
                        <div className="card-body company-card-body">
                          <div className="d-flex align-items-center pb-2">
                            <div className="media-body flex-fill">
                              <img
                                src={
                                  companyData.company?.profile_picture ||
                                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"
                                }
                                className="rounded-circle img-fluid img-md"
                                alt=""
                                loading="lazy"
                                style={{
                                  width: "54px",
                                  height: "54px",
                                  objectFit: "cover",
                                  margin: "0 0 10px 0",
                                }}
                              />
                            </div>
                            <div className="media-body pe-1 pb-4">
                              {favoriteCompanies.some(
                                (favCompany) =>
                                  favCompany.uuid === companyData.company.uuid
                              ) ? (
                                <Button
                                  content={undefined}
                                  onClick={() =>
                                    removeFavoriteCompany(
                                      companyData.company.uuid
                                    )
                                  }
                                  style={undefined}
                                  className={`icon-heart-red z-3`}
                                  disabled={undefined}
                                  type={undefined}
                                />
                              ) : (
                                <Button
                                  content={undefined}
                                  onClick={() =>
                                    favoriteCompany(companyData.company.uuid)
                                  }
                                  style={undefined}
                                  className={`icon-heart-gray z-3`}
                                  disabled={undefined}
                                  type={undefined}
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            <h5
                              className="card-title"
                              style={{
                                lineHeight: "0.1px",
                                fontSize: "18px",
                                fontWeight: "600",
                              }}
                            >
                              {companyData.company.name}
                            </h5>
                            <p
                              style={{
                                fontSize: "15px",
                                padding: "0 0 15px 0",
                                fontWeight: "400",
                              }}
                            >
                              Handledare:{" "}
                              {companyData.supervisor?.firstName || ""}{" "}
                              {companyData.supervisor?.lastName || ""}
                            </p>
                          </div>
                          <div className="bio">
                            <h4
                              style={{
                                lineHeight: "0.1px",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              {companyData.company.location}
                            </h4>
                            <div>
                              <p
                                className="card-text"
                                style={{ fontSize: "16px", fontWeight: "400" }}
                              >
                                {companyData.company.about}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))
          ) : (
            <li>No companies found</li>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyLists;
