import { useEffect, useState } from "react";
import "../../../assets/Icons/Icons.css";
import { useLocation } from "react-router-dom";
import { fetchFilteredPosts } from "../../../api/api.tsx";
import PostItem from "./postItem.tsx";
import Button from "../../props/Button.tsx";

const FilteredPosts = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // Default per page
  const [totalPosts, setTotalPosts] = useState(0);

  const location = useLocation(); // Get the URL location
  const searchParams = new URLSearchParams(location.search);
  const classParam = searchParams.get("class"); // Get the 'class' query parameter
  const userParam = searchParams.get("user"); // Get the 'user' query parameter

  useEffect(() => {
    // Call the fetchFilteredPosts function from the api.js file
    fetchFilteredPosts(
      currentPage,
      perPage,
      classParam,
      userParam,
      setFilteredPosts,
      setLastPage,
      setPerPage,
      setTotalPosts,
      setLoading
    );
  }, [currentPage, perPage, classParam, userParam]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <ul className="list-group">
            {filteredPosts.map((post) => (
              // Render each post using the PostItem component
              <PostItem key={post.uuid} post={post} user={user} />
            ))}
          </ul>

          {totalPosts > 5 && (
            <div className="d-flex justify-content-evenly align-items-center pt-3 pb-5">
              <Button
                text={`Previous Page`}
                onClick={() => setCurrentPage(currentPage - 1)}
                style={undefined}
                className={`page-item rounded-0`}
                disabled={currentPage === 1}
              ></Button>
              <div
                className="px-3"
                style={{ marginLeft: "50px", marginRight: "50px" }}
              >
                <span>
                  {currentPage} / {lastPage}
                </span>
              </div>
              <Button
                text={`Next Page`}
                onClick={() => setCurrentPage(currentPage + 1)}
                style={undefined}
                className={`page-item rounded-0`}
                disabled={currentPage === lastPage}
              ></Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FilteredPosts;
