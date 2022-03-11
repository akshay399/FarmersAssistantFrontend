import { Link } from "react-router-dom";
import "./navigation.css";
export const Navigation = (props) => {
  const { handleLogout, user } = props;
  {
    console.log("this is user in nav", user);
  }
  return (
    <nav id="menu" className="   navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            style={{ height: "25px" }}
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a
            style={{ color: "black" }}
            className=" navbar-brand page-scroll"
            href="/"
          >
            Farmer's Assistant
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse "
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/crop" className="page-scroll">
                Crop
              </a>
            </li>
            <li>
              <a href="/fertilizer" className="page-scroll">
                Fertilizer recc.
              </a>
            </li>
            <li>
              <a href="/disease" className="page-scroll">
                Disease Detection
              </a>
            </li>
            <li>
              <a href="/disease-portal" className="page-scroll">
                Disease Portal
              </a>
            </li>
            <li>
              <a href="/news" className="page-scroll">
                News
              </a>
            </li>
            <li>
              {user ? (
                <a href="/" onClick={handleLogout} className="page-scroll">
                  Logout
                </a>
              ) : (
                <a href="/signup" className="page-scroll">
                  Sign up
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
