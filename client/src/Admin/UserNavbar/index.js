import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoIosRocket } from "react-icons/io";
import { BsPersonFillAdd } from "react-icons/bs";
import "./index.css";

const UserNavbar = () => {
  const [date, updateDate] = useState(new Date());
  const [orgData, setOrgData] = useState({});
  const [userData, setUserData] = useState({});
  const [profile, setprofilePic] = useState();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        console.log(token);
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const userApi = "http://localhost:3009/api/v1/userinfo";
        const orgResponse = await fetch(userApi, options);
        const orgJson = await orgResponse.json();
        console.log(orgJson.data.profilePic, "saiaiiiiiiiiii");
        // Update orgData with organizationName
        setOrgData(orgJson.data); // Assuming there's only one user in results

        // Update userData with user details
        setUserData(orgJson.data);
        setprofilePic(orgJson.data.profilePic); // Assuming there's only one user in results
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();

    const intervalId = setInterval(() => {
      ticking();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const ticking = () => {
    updateDate(new Date());
  };

  const PDF_URL = process.env.REACT_APP_PDF_URL;

  return (
    <nav className="user-navbar-main-nav-container">
      <div className="user-navbar-mini-nav-container">
        <div className="user-navbar-organization-name-searchbar-main-container">
          <div className="user-navbar-organization-name-main-container">
            <p className="user-navbar-text">{orgData.organizationName}</p>
          </div>
          <div className="user-navbar-search-bar-main-container">
            <input className="user-navbar-search-bar" type="search" />
            <FaSearch className="user-nav-bar-search-icon" />
          </div>
        </div>
        <div>
          <span>{date.toLocaleTimeString()}</span>
        </div>

        <div className="user-navbar-upgrade-invite-btns-main-container">
          <button className="user-navbar-upgrade-btn-main-container">
            <IoIosRocket />
            <p className="user-navbar-text">Upgrade</p>
          </button>
          <button className="user-navbar-invite-btn-main-container">
            <BsPersonFillAdd />
            <p className="user-navbar-text">Invite</p>
          </button>
        </div>
        <div className="user-navbar-username-main-container">
          <img
            src={`http://localhost:3009/${profile}`}
            alt={userData.fullName}
            className="user-info-navbar-logo"
          />
          <p className="user-navbar-text">{userData.fullName}</p>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
