import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import userContext from "../context/user/userContext";

const Navbar = () => {
  let location = useLocation();
  // const context = useContext(userContext);
  // const { user,  getUserData } = context;

  const handleLogout = (e) => {
    localStorage.removeItem("token");
  };

  const navigate = useNavigate();

  const [user, setUser] = useState("");

  // Get all a Note
  const getUserData = async () => {
    // API Call
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const json = await response.json();

    setUser(json);
    console.log("json: ", json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
      console.log("user: ", user);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [dropdown, setDropdown] = useState(false);

  const toggleOpen = () => {
    setDropdown(!dropdown);
  };

  const menuClass = `dropdown-menu${dropdown ? " show" : ""} bg-dark `;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{
        // background: "linear-gradient(135deg, #485563 0%,#29323c  100%)",
        background: "linear-gradient(135deg, #0F2027 0%, #2C5364  100%)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {localStorage.getItem("token") ? (
              <>
                <div className="dropdown mx-3 text-center" onClick={toggleOpen}>
                  <button
                    className="btn btn-none text-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                  >
                    <span className="">{user.name}</span>
                  </button>
                  <div
                    className={menuClass}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      className="btn btn-none text-light border border-danger mx-2 d-flex justify-content-center"
                      to="/login"
                      role="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link className="btn btn-dark mx-2" to="/login" role="button">
                  Login
                </Link>
                <Link className="btn btn-dark mx-2" to="/signup" role="button">
                  Sign Up
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
