import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTasks } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { GrProjects } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { useEffect, useState } from "react";
import ProjectsTable from "../ProjectsList";
import "./index.css";
import UserNavbar from "../UserNavbar";
import { useNavigate } from "react-router-dom";

import AddProjectForm from "../AddProjectForm";
import TasksTable from "../TasksList";
import AddEmployeeForm from "../EmployeeForm";
import EmployeesList from "../EmployeesList";
import Cookies from "js-cookie";
import TimeSheetForm from "../AddTimeSheet";

function UserPanel1() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active, setActive] = useState("alltasks");
  const [logoImageUrl, setLogoImageUrl] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove cookies here
    Cookies.remove("jwtToken");
    Cookies.remove("wiseid");
    Cookies.remove("wiseemplyid");
    Cookies.remove("role");

    // Navigate to login page
    navigate("/login");
  };

  useEffect(() => {
    // Example fetch request to retrieve image URL
    const fetchLogoImageUrl = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const api = "http://localhost:3009/api/v1/organization-logo";
        const response = await fetch(api, options);
        if (response.ok) {
          const data = await response.json();
          setLogoImageUrl(data.data.companyLogo);
        } else {
          // Handle error cases if needed
        }
      } catch (error) {
        // Handle fetch errors
        console.error("Error fetching image URL:", error);
      }
    };

    // Call the fetch function
    fetchLogoImageUrl();
  }, []);

  const PDF_URL = process.env.REACT_APP_PDF_URL;

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      <Sidebar
        backgroundColor="#0f5298"
        className="sidebar-container"
        collapsed={isCollapsed}
        collapsedWidth="60px"
      >
        <Menu
          className="sidebar-icons-container"
          menuItemStyles={{
            button: {
              "&.active": {
                backgroundColor: "#0f5298",
                color: "#b6c8d9",
              },
              backgroundColor: "#0f5298", // Background color for menu items
              color: "#ffffff", // Default text color for menu items
              "&:hover": {
                backgroundColor: "#0000b3", // Background color on hover
                color: "#ffffff", // Text color on hover
              },
            },
          }}
        >
          <div className="hamburger-icon">
            <GiHamburgerMenu onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>
          <MenuItem icon={<FaTasks />} onClick={() => setActive("alltasks")}>
            Add Tasks
          </MenuItem>

          <MenuItem
            icon={<GrProjects />}
            onClick={() => setActive("allprojects")}
          >
            All Tasks
          </MenuItem>
          <MenuItem
            icon={<GrProjects />}
            onClick={() => setActive("addproject")}
          >
            Add Project
          </MenuItem>
          <MenuItem
            icon={<HiUsers />}
            onClick={() => setActive("employeelist")}
          >
            Employees List
          </MenuItem>
          <MenuItem icon={<HiUsers />} onClick={() => setActive("addemployee")}>
            Add Employee
          </MenuItem>
          <MenuItem
            icon={<IoMdSettings />}
            onClick={() => setActive("settings")}
          >
            Settings
          </MenuItem>
          <MenuItem icon={<IoLogOut />} onClick={handleLogout}>
            LogOut
          </MenuItem>
        </Menu>
        <div className="sidebar-logo-name">
          <img
            src={`${PDF_URL}${logoImageUrl}`}
            alt="logo"
            className="sidebar-logo-image"
          />
        </div>
      </Sidebar>
      <div style={{ width: "100%" }}>
        <UserNavbar />
        {active === "alltasks" && <TimeSheetForm />}
        {active === "allprojects" && <ProjectsTable />}
        {active === "addproject" && <AddProjectForm />}
        {active === "employeelist" && <EmployeesList />}
        {active === "addemployee" && <AddEmployeeForm />}
      </div>
    </div>
  );
}

export default UserPanel1;
