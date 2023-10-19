import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";
import getAuthHeaders from "./getAuthHeaders";

// Fetch the API URLs from config.json
export const fetchApiUrls = async () => {
  try {
    const response = await fetch("/config.json"); // Adjust the path if needed
    const config = await response.json();
    const apiUrlMaps = config.apis.map(
      (api) => `${config.apiBaseUrl}${api.path}`
    );

    const storageUrls = config.storage.map(
      (storage) => `${config.apiBaseUrl}${storage.path}`
    );

    return { apiUrls: apiUrlMaps, storageUrls };
  } catch (error) {
    console.error("Error fetching API URLs:", error);
    throw error;
  }
};

export const useFetchData1 = (
  apiIndex,
  method,
  requestData = null,
  headers = {}
) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const { apiUrls } = await fetchApiUrls();
        const url = apiUrls[apiIndex];
        const response = await axios({
          method,
          url,
          data: requestData,
          headers,
        });
        setFetchedData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error as Error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [apiIndex, method, requestData, headers]);

  return { fetchedData, error, isFetching };
};

export const useLogin = (
  apiIndex: number,
  method: string, // Add the method parameter
  requestData = null,
  headers = {}
) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginUser = async () => {
    setIsLoggingIn(true);

    try {
      const { apiUrls } = await fetchApiUrls();
      const url = apiUrls[apiIndex];

      if (!url) {
        throw new Error(`API URL "${url}" not found`);
      }

      const response = await axios({
        method, // Use the provided HTTP method
        url: url,
        data: requestData,
        headers,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        const { success, error } = await fetchAndProcessUserData(token);

        if (success) {
          setIsLoggedIn(true);
        } else {
          setLoginError(error);
        }
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return { isLoggedIn, loginError, isLoggingIn, loginUser };
};

const fetchAndProcessUserData = async (token) => {
  try {
    const decodedToken = jwtDecode(token) as DecodedToken;
    const userUuid = decodedToken.sub;

    const { apiUrls } = await fetchApiUrls();
    const url = `${apiUrls[2]}/${userUuid}`;

    const userResponse = await axios.get(url);

    const user = userResponse.data;
    const encryptedUserData = encryptData(JSON.stringify(user));
    localStorage.setItem("userData", encryptedUserData);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return { success: true };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, error: "An error occurred during login" };
  }
};

export const updateProfile = async (formData) => {
  const { apiUrls } = await fetchApiUrls();
  const url = apiUrls[3];

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data", // Important for image upload
      },
    });
    return response; // Make sure to return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component.
  }
};

export const userByRoles = async () => {
  const { apiUrls } = await fetchApiUrls();
  const url = apiUrls[4];

  try {
    const response = await axios.get(url, {
      headers: getAuthHeaders(), // Assuming getAuthHeaders() is defined and returns the Authorization header.
    });
    return response.data; // Make sure to return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the Dashboard component.
  }
};

// Encrypt data using your encryption method
export const encryptData = (data: string) => {
  const secretKey = "123456"; // Replace with your secret key
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
};

// Decrypt data using your decryption method
export const decryptData = (encryptedData: string) => {
  const secretKey = "123456"; // Replace with your secret key

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};

export const fetchAllCompanyProfiles = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.companies;
  } catch (error) {
    console.error("Error fetching company profiles:", error);
    throw error; // Rethrow the error to let the caller handle it
  }
};

export const createPost = async (postData) => {
  const { apiUrls } = await fetchApiUrls();
  const url = apiUrls[5];

  try {
    const response = await axios.post(url, postData, {
      headers: {
        ...getAuthHeaders(), // Assuming getAuthHeaders() returns the Authorization header.
        "Content-Type": "multipart/form-data", // Set the content type for file upload.
      },
    });
    return response.data; // Make sure to return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the Dashboard component.
  }
};

export const createClass = async (classData) => {
  const { apiUrls } = await fetchApiUrls();
  const url = apiUrls[7];

  try {
    const response = await axios.post(url, classData, {
      headers: {
        ...getAuthHeaders(), // Assuming getAuthHeaders() returns the Authorization header.
      },
    });
    return response.data; // Make sure to return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the Dashboard component.
  }
};

export const fetchFilteredPosts = async (
  currentPage,
  perPage,
  classParam,
  userParam,
  setFilteredPosts,
  setLastPage,
  setPerPage,
  setTotalPosts,
  setLoading
) => {
  try {
    const params = {
      per_page: perPage,
      page: currentPage,
      class: classParam, // Include the class parameter
      user: userParam, // Include the user parameter
    };

    const { apiUrls } = await fetchApiUrls();
    const url = apiUrls[8];

    // Make the API request to fetch posts for the specified class and user
    const postsResponse = await axios.get(url, {
      params: params,
      headers: {
        ...getAuthHeaders(),
      },
    });

    setFilteredPosts(postsResponse.data.filteredPosts);
    setLastPage(postsResponse.data.pagination.last_page);
    setPerPage(postsResponse.data.pagination.per_page);
    setTotalPosts(postsResponse.data.pagination.total);

    setLoading(false); // Remove loading state
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};

export const acceptPost = async (postUuid) => {
  const headers = getAuthHeaders();
  const { apiUrls } = await fetchApiUrls();
  const url = `${apiUrls[9]}/${postUuid}/accept`;

  try {
    const response = await axios.post(url, null, {
      headers,
    });

    if (response.status === 200) {
      return "approved";
    }
  } catch (error) {
    console.error("Error accepting post:", error);
    console.error("Server response:", error.response); // Add this line to log the response details
  }

  return null;
};

export const declinePost = async (postUuid) => {
  const headers = getAuthHeaders();
  const { apiUrls } = await fetchApiUrls();
  const url = `${apiUrls[9]}/${postUuid}/decline`;

  try {
    const response = await axios.post(url, null, {
      headers,
    });

    if (response.status === 200) {
      return "rejected";
    }
  } catch (error) {
    console.error("Error declining post:", error);
    console.error("Server response:", error.response); // Add this line to log the response details
  }

  return null;
};

export const createClassRule = async (formData) => {
  const { apiUrls } = await fetchApiUrls();
  const url = apiUrls[6]; // Replace with the appropriate API URL for creating class rules

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data", // Important for image upload
      },
    });
    return response; // Make sure to return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component.
  }
};

export const checkAndUpdateClassRule = async (formData) => {
  const { apiUrls } = await fetchApiUrls();
  const url = `${apiUrls[11]}/check-and-update`; // Replace with the appropriate API URL for checking an existing class rule

  try {
    const response = await axios.post(url, formData);
    return response.data; // Return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component.
  }
};

export const updateClassRule = async (formData) => {
  const { apiUrls } = await fetchApiUrls();
  const url = `${apiUrls[11]}/update`; // Replace with the appropriate API URL for updating class rules

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data", // Important for image upload
      },
    });
    return response; // Make sure to return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component.
  }
};

export const deleteClassRule = async (classRuleId) => {
  const { apiUrls } = await fetchApiUrls();
  const url = `${apiUrls[6]}/${classRuleId}`; // Replace with the appropriate API URL for deleting class rules

  try {
    const response = await axios.delete(url, {
      headers: getAuthHeaders(),
    });
    return response; // Make sure to return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component.
  }
};

export const showOwnClass = async () => {
  const { apiUrls } = await fetchApiUrls();
  const url = `${apiUrls[10]}`; // Replace with the appropriate API URL for getting a class rule by ID

  try {
    const response = await axios.get(url, {
      headers: getAuthHeaders(),
    });
    return response.data; // Make sure to return the data from the response.
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component.
  }
};

export async function fetchStudentsBySchool(schoolId: any) {
  const { apiUrls } = await fetchApiUrls();
  const url = `${apiUrls[12]}`; // Replace with the appropriate API URL for getting a class rule by ID

  try {
    const response = await axios.get(`${url}/${schoolId}`, {
      headers: getAuthHeaders(),
    });
    return response.data.filter(
      (student: { role_id: number }) => student.role_id === 4
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}
