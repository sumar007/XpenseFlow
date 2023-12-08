import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import "./Header.css";
import logo from "../Images/logo xf.png"
const Header = (props) => {
  const onClickLogout = () => {
    const { history } = props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
             <img
              className="website-logo"
              src={logo}
              alt="website logo"
            /> 
          </Link>
          <ul className="nav-bar-mobile-icons-container">
            <li>
              <Link to="/">
                <AiFillHome className="nav-item-mobile-link" />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <BsFillBriefcaseFill className="nav-item-mobile-link" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
              >
                <FiLogOut />
              </button>
            </li>
          </ul>
        </div>
        <div className="nav-bar-large-container">
          <Link to="/">
           <img
              className="website-logo"
              src={logo}
              alt="website logo"
            /> 
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/aboutus" className="nav-link">
                Why Xpense Flow
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/support" className="nav-link">
                Support
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Try For Free
          </button>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
