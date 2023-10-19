import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary.tsx";
import DefaultLayout from "./layouts/DefaultLayout.tsx";
import GuestLayout from "./layouts/GuestLayout.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import { PostProvider } from "./contexts/postContext.tsx";
import { useFetchData1 } from "./api/api.tsx";
import getAuthHeaders from "./api/getAuthHeaders.tsx";

const defaultPaths = [
  "/",
  "settings",
  "/history",
  "/all-posts",
  "/class",
  "/company-lists",
  "/company/:uuid",
  "/test",
];

const headers = getAuthHeaders();

function App() {
  const data = useFetchData1(0, "GET", null, headers);
  const token = localStorage.getItem("token");

  const user = data.fetchedData;

  const defaultRoutes = defaultPaths.map((path, index) => (
    <Route
      key={index}
      path={path}
      element={<DefaultLayout user={user} />} // Pass 'data.user' as the 'user' prop
    />
  ));

  console.log(user);

  return (
    <Router>
      <ErrorBoundary>
        {/* Wrap the entire App component content with UserProvider and PostProvider */}
        <UserProvider user={user}>
          <PostProvider>
            <Routes>
              {/* Render the default routes */}
              {defaultRoutes}

              {/* Render the guest routes */}
              <Route path="/login" element={<GuestLayout />} />

              {/* Redirect to /login when user is not logged in */}
              {token && <Route path="*" element={<Navigate to="/" />} />}
              {!token && <Route path="*" element={<Navigate to="/login" />} />}
            </Routes>
          </PostProvider>
        </UserProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
