import { acceptPost, declinePost } from "../../../api/api.tsx";
import { mapStatusToName, mapStatusToNameMobile } from "./mapStatusToName.tsx";
import { useEffect, useState } from "react";
import TimeDifference from "./timeDifference.tsx";

const PostItem = ({ post, user }) => {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isTabletViewport, setIsTabletViewport] = useState(false); // Add tablet viewport state

  // Handle window resize event
  useEffect(() => {
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

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleAccept = async () => {
    const newStatus = await acceptPost(post.uuid);
    if (newStatus === "approved") {
      // Update the status in the post object
      // Refresh or update the state to reflect the new status
      window.location.reload();
    }
  };

  const handleDecline = async () => {
    const newStatus = await declinePost(post.uuid);
    if (newStatus === "rejected") {
      // Update the status in the post object
      // Refresh or update the state to reflect the new status
      window.location.reload();
    }
  };

  const PostStatus = ({ status }) => {
    const statusName = mapStatusToName(status);
    return <>{statusName}</>;
  };

  const PostStatusMobile = ({ status }) => {
    const statusName = mapStatusToNameMobile(status);
    return <p>{statusName}</p>;
  };

  const styles = {
    desktop: [
      {
        width: "100%",
      },
      {
        width: "100%",
        height: "290px",
      },
      {
        width: "100%",
        padding: "8px",
        justifyContent: "space-between",
      },
      {
        width: "100%",
        height: "100%",
      },
      {
        width: "620px",
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.08)",
      },
      {
        fontWeight: "600",
        fontSize: "18px",
      },
      {
        fontWeight: "400",
        fontSize: "16px",
      },
      {
        fontWeight: "400",
        fontSize: "16px",
      },
      {
        fontWeight: "400",
        fontSize: "16px",
      },
      {
        fontWeight: "700",
        fontSize: "18px",
      },
      {
        fontWeight: "400",
        fontSize: "16px",
      },
    ],
    mobile: [
      {
        width: "100%",
      },
      {
        width: "100%",
        height: "460px",
      },
      {
        width: "100%",
        padding: "8px",
        justifyContent: "space-between",
      },
      {
        width: "100%",
        height: "100%",
      },
      {
        width: "100%",
      },
      {
        fontWeight: "600",
        fontSize: "18px",
      },
      {
        fontWeight: "400",
        fontSize: "16px",
      },
      {
        fontWeight: "400",
        fontSize: "18px",
      },
    ],
    tablet: [
      {
        width: "100%",
      },
      {
        width: "100%",
        height: "700px",
      },
      {
        width: "100%",
        padding: "8px",
        justifyContent: "space-between",
      },
      {
        width: "100%",
        height: "100%",
      },
      {
        width: "100%",
      },
      {
        fontWeight: "600",
      },
    ],
  };

  const viewPorts = () => {
    if (isMobileViewport) {
      return (
        <li className="my-1 bg-white" style={styles.mobile[4]}>
          <div className=".container" style={styles.mobile[0]}>
            <p className="ps-2">
              <div className="d-flex align-items-center">
                <img
                  src={`${post.user.profile_picture}`}
                  className="rounded-circle img-fluid img-md"
                  alt=""
                  loading="lazy"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <div className="media-body ml-3 ps-2 flex-fill">
                  <span style={styles.mobile[5]}>
                    {post.user.first_name} {post.user.last_name}
                  </span>
                  <div className="text-muted small">
                    <span style={styles.mobile[6]}>EE20</span>
                  </div>
                </div>
                <div className="media-body ml-3 pe-2">
                  <div className="text-muted small" style={styles.mobile[6]}>
                    <TimeDifference createdAt={post.created_at} />
                  </div>
                </div>
              </div>
            </p>
            <div className="d-block ps-2 pe-2">
              <p className="text-break" style={styles.mobile[7]}>
                {post.content}
              </p>
            </div>
          </div>
          {post.image ? (
            <div
              className=".container border-top border-1 border-dark-subtle"
              style={styles.mobile[1]}
            >
              <img
                src={post.image}
                alt=""
                style={styles.mobile[3]}
                className="img-fluid img-md object-fit-cover"
              />
            </div>
          ) : (
            <></>
          )}
          <div
            className=".container border-top border-1 border-dark-subtle d-flex"
            style={styles.mobile[2]}
          >
            <div className="left-text m-auto">
              {user.user.roleId === 2 && post.status === "pending" ? (
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-sm rounded-circle"
                    onClick={handleAccept}
                    style={{
                      marginRight: "10px",
                      background: "#21DB4A",
                      color: "#ffffff",
                      borderColor: "#21DB4A", // Change this to the desired border color
                      borderWidth: "5px",
                      fontWeight: "1000",
                      fontSize: "20px",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0,0,256,256"
                    >
                      <g
                        fill="#ffffff"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(9.84615,9.84615)">
                          <path d="M22.56641,4.73047l-1.79297,-1.21875c-0.49609,-0.33594 -1.17578,-0.20703 -1.50781,0.28516l-8.78906,12.96094l-4.03906,-4.03906c-0.42187,-0.42187 -1.10937,-0.42187 -1.53125,0l-1.53516,1.53516c-0.42187,0.42188 -0.42187,1.10938 0,1.53516l6.21094,6.21094c0.34766,0.34766 0.89453,0.61328 1.38672,0.61328c0.49219,0 0.98828,-0.30859 1.30859,-0.77344l10.57813,-15.60547c0.33594,-0.49219 0.20703,-1.16797 -0.28906,-1.50391z"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <div className="p-2"></div>
                  <button
                    type="button"
                    className="btn btn-sm rounded-circle"
                    style={{
                      background: "#DB2121",
                      color: "#ffffff",
                      borderColor: "#DB2121", // Change this to the desired border color
                      borderWidth: "5px",
                      fontWeight: "1000",
                      fontSize: "20px",
                      width: "50px",
                      height: "50px",
                    }}
                    onClick={handleDecline}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0,0,256,256"
                    >
                      <g
                        fill="#ffffff"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(8.53333,8.53333)">
                          <path d="M7,4c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-2,2c-0.391,0.391 -0.391,1.02406 0,1.41406l7.29297,7.29297l-7.29297,7.29297c-0.391,0.391 -0.391,1.02406 0,1.41406l2,2c0.391,0.391 1.02406,0.391 1.41406,0l7.29297,-7.29297l7.29297,7.29297c0.39,0.391 1.02406,0.391 1.41406,0l2,-2c0.391,-0.391 0.391,-1.02406 0,-1.41406l-7.29297,-7.29297l7.29297,-7.29297c0.391,-0.39 0.391,-1.02406 0,-1.41406l-2,-2c-0.391,-0.391 -1.02406,-0.391 -1.41406,0l-7.29297,7.29297l-7.29297,-7.29297c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297z"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <PostStatusMobile status={post.status} />
                </>
              )}
            </div>
            <div className="right-text d-flex m-auto">
              <div
                className="p-1 m-auto rounded-3 me-4"
                style={{ background: "#C8C8C8" }}
              >
                <span style={{ fontSize: "25px" }}>
                  {formatTime(post.from)}
                </span>
              </div>
              <div
                className="p-1 m-auto rounded-3"
                style={{ background: "#C8C8C8" }}
              >
                <span style={{ fontSize: "25px" }}>{formatTime(post.to)}</span>
              </div>
            </div>
          </div>
        </li>
      );
    } else if (isTabletViewport) {
      return (
        <li className="my-1 bg-white" style={styles.tablet[4]}>
          <div className=".container" style={styles.tablet[0]}>
            <p className="ps-2">
              <div className="d-flex align-items-center">
                <img
                  src={`${post.user.profile_picture}`}
                  className="rounded-circle img-fluid img-md"
                  alt=""
                  loading="lazy"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <div className="media-body ml-3 ps-2 flex-fill">
                  <span style={styles.tablet[5]}>
                    {post.user.first_name} {post.user.last_name}
                  </span>
                  <div className="text-muted small">
                    <span>EE20</span>
                  </div>
                </div>
                <div className="media-body ml-3 pe-2">
                  <div className="text-muted small">
                    <TimeDifference createdAt={post.created_at} />
                  </div>
                </div>
              </div>
            </p>
            <div className="d-block ps-2 pe-2">
              <p className="text-break">{post.content}</p>
            </div>
          </div>
          {post.image ? (
            <div
              className=".container border-top border-1 border-dark-subtle"
              style={styles.tablet[1]}
            >
              <img
                src={post.image}
                alt=""
                style={styles.tablet[3]}
                className="img-fluid img-md object-fit-cover"
              />
            </div>
          ) : (
            <></>
          )}
          <div
            className=".container border-top border-1 border-dark-subtle d-flex"
            style={styles.tablet[2]}
          >
            <div className="left-text m-auto">
              {user.user.roleId === 2 && post.status === "pending" ? (
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-sm rounded-circle"
                    onClick={handleAccept}
                    style={{
                      marginRight: "10px",
                      background: "#21DB4A",
                      color: "#ffffff",
                      borderColor: "#21DB4A", // Change this to the desired border color
                      borderWidth: "5px",
                      fontWeight: "1000",
                      fontSize: "20px",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0,0,256,256"
                    >
                      <g
                        fill="#ffffff"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(9.84615,9.84615)">
                          <path d="M22.56641,4.73047l-1.79297,-1.21875c-0.49609,-0.33594 -1.17578,-0.20703 -1.50781,0.28516l-8.78906,12.96094l-4.03906,-4.03906c-0.42187,-0.42187 -1.10937,-0.42187 -1.53125,0l-1.53516,1.53516c-0.42187,0.42188 -0.42187,1.10938 0,1.53516l6.21094,6.21094c0.34766,0.34766 0.89453,0.61328 1.38672,0.61328c0.49219,0 0.98828,-0.30859 1.30859,-0.77344l10.57813,-15.60547c0.33594,-0.49219 0.20703,-1.16797 -0.28906,-1.50391z"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <div className="p-2"></div>
                  <button
                    type="button"
                    className="btn btn-sm rounded-circle"
                    style={{
                      background: "#DB2121",
                      color: "#ffffff",
                      borderColor: "#DB2121", // Change this to the desired border color
                      borderWidth: "5px",
                      fontWeight: "1000",
                      fontSize: "20px",
                      width: "50px",
                      height: "50px",
                    }}
                    onClick={handleDecline}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0,0,256,256"
                    >
                      <g
                        fill="#ffffff"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style={{ mixBlendMode: "normal" }}
                      >
                        <g transform="scale(8.53333,8.53333)">
                          <path d="M7,4c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-2,2c-0.391,0.391 -0.391,1.02406 0,1.41406l7.29297,7.29297l-7.29297,7.29297c-0.391,0.391 -0.391,1.02406 0,1.41406l2,2c0.391,0.391 1.02406,0.391 1.41406,0l7.29297,-7.29297l7.29297,7.29297c0.39,0.391 1.02406,0.391 1.41406,0l2,-2c0.391,-0.391 0.391,-1.02406 0,-1.41406l-7.29297,-7.29297l7.29297,-7.29297c0.391,-0.39 0.391,-1.02406 0,-1.41406l-2,-2c-0.391,-0.391 -1.02406,-0.391 -1.41406,0l-7.29297,7.29297l-7.29297,-7.29297c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297z"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <PostStatusMobile status={post.status} />
                </>
              )}
            </div>
            <div className="right-text d-flex m-auto">
              <div
                className="p-1 m-auto rounded-3 me-4"
                style={{ background: "#C8C8C8" }}
              >
                <span style={{ fontSize: "25px" }}>
                  {formatTime(post.from)}
                </span>
              </div>
              <div
                className="p-1 m-auto rounded-3"
                style={{ background: "#C8C8C8" }}
              >
                <span style={{ fontSize: "25px" }}>{formatTime(post.to)}</span>
              </div>
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <li
          className="bg-white border-dark-subtle rounded-4"
          style={styles.desktop[4]}
        >
          <div className=".container" style={styles.desktop[0]}>
            <p className="ps-2">
              <div className="d-flex align-items-center">
                <img
                  src={`${post.user.profile_picture}`}
                  className="rounded-circle img-fluid img-md"
                  alt=""
                  loading="lazy"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <div className="media-body ml-3 ps-2 flex-fill">
                  <span style={styles.desktop[5]}>
                    {post.user.first_name} {post.user.last_name}
                  </span>
                  <div className="text-muted small">
                    <span style={styles.desktop[6]}>EE20</span>
                  </div>
                </div>
                <div className="media-body ml-3 pe-2">
                  <div className="text-muted small" style={styles.desktop[6]}>
                    <TimeDifference createdAt={post.created_at} />
                  </div>
                </div>
              </div>
            </p>
            <div className="d-block ps-2 pe-2">
              <p className="text-break" style={styles.desktop[7]}>
                {post.content}
              </p>
            </div>
          </div>
          {post.image ? (
            <div
              className=".container border-top border-1 border-dark-subtle"
              style={styles.desktop[1]}
            >
              <img
                src={post.image}
                alt=""
                style={styles.desktop[3]}
                loading="lazy"
                className="img-fluid img-md object-fit-cover"
              />
            </div>
          ) : (
            <></>
          )}
          <div
            className=".container border-top border-1 border-dark-subtle d-flex"
            style={styles.desktop[2]}
          >
            <div className="left-text">
              {user.user.roleId === 2 && post.status === "pending" ? (
                <div className="Post-Actions">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={handleAccept}
                    style={{
                      marginRight: "10px",
                      background: "#ffffff",
                      color: "#77148E",
                      borderColor: "#77148E", // Change this to the desired border color
                      fontWeight: "600",
                    }}
                  >
                    Godkänn
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      background: "#ffffff",
                      color: "#77148E",
                      borderColor: "#77148E", // Change this to the desired border color
                      fontWeight: "600",
                    }}
                    onClick={handleDecline}
                  >
                    Neka
                  </button>
                </div>
              ) : (
                <div style={styles.desktop[9]}>
                  <PostStatus status={post.status} />
                </div>
              )}
            </div>
            <div className="right-text">
              <span style={styles.desktop[8]}>
                {formatTime(post.from)} - {formatTime(post.to)}
              </span>
            </div>
          </div>
        </li>
      );
    }
  };

  return <>{viewPorts()}</>;
};

export default PostItem;
