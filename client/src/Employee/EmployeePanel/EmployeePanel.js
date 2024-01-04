import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { useEffect, useState } from "react";
import ProjectsTable from "../../Admin/ProjectsList";
import { PiUserListBold, PiUserCirclePlusBold } from "react-icons/pi";
import { MdOutlineDensitySmall, MdAssignmentAdd } from "react-icons/md";
// import "./index.css";
import UserNavbar from "../../Admin/UserNavbar";
import { useNavigate } from "react-router-dom";
import AddProjectForm from "../../Admin/AddProjectForm";
import AddEmployeeForm from "../../Admin/EmployeeForm";
import EmployeesList from "../../Admin/EmployeesList";
import Cookies from "js-cookie";

import TimeSheetForm from "../../Admin/AddTimeSheet";

import ProjecEditForm from "../../Admin/ProjectEditForm/ProjectEditForm";
import EmployeeDetail from "../../Admin/EmployeeDetail";
import TimeSheet from "../TimeSheet/TimeSheet";

function EmployeePanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active, setActive] = useState("addsheet");
  const [role, setRole] = useState("");
  const [projectId, setProjectId] = useState();
  const [logoImageUrl, setLogoImageUrl] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove cookies here
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");

    // Navigate to login page
    navigate("/adminlogin");
  };

  const setUpdateProjectId = (id) => {
    setProjectId(id);
    setActive("projectview");
  };

  const setUpdateEmployeeId = (id) => {
    setEmployeeId(id);
    setActive("employeeview");
  };

  useEffect(() => {
    // Example fetch request to retrieve image URL
    const fetchLogoImageUrl = async () => {
      try {
        const token = sessionStorage.getItem("token");
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

    const fetchRoles = async () => {
      const role = sessionStorage.getItem("role");
      const token = sessionStorage.getItem("token");
      setRole(role);
    };

    // Call the fetch function
    fetchRoles();
    fetchLogoImageUrl();
  }, []);

  const PDF_URL = process.env.REACT_APP_PDF_URL;
  console.log(projectId, "saiiiii", active, "active");
  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      <Sidebar
        backgroundColor="#ced4da"
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
              backgroundColor: "#ced4da", // Background color for menu items
              color: "#050505", // Default text color for menu items
              "&:hover": {
                width: "90%",
                marginLeft: "10px",
                borderRadius: "10px",
                backgroundColor: "#004e89", // Background color on hover
                color: "#F0F0F0 ", // Text color on hover
              },
            },
          }}
        >
          <div className="hamburger-icon">
            <GiHamburgerMenu onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>
          <MenuItem
            icon={<MdAssignmentAdd />}
            onClick={() => setActive("addsheet")}
          >
            Add Time Sheet
          </MenuItem>
          {role === "manager" && (
            <MenuItem
              icon={<MdOutlineDensitySmall />}
              onClick={() => setActive("allprojects")}
            >
              All Projects
            </MenuItem>
          )}

          {role === "manager" && (
            <MenuItem
              icon={<GrProjects />}
              onClick={() => setActive("addproject")}
            >
              Add Project
            </MenuItem>
          )}
          {role === "manager" && (
            <MenuItem
              icon={<PiUserListBold />}
              onClick={() => setActive("employeelist")}
            >
              Employees List
            </MenuItem>
          )}

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

        {active === "addsheet" && <TimeSheet />}
        {active === "allprojects" && (
          <ProjectsTable getProjectId={setUpdateProjectId} />
        )}

        {active === "addproject" && <AddProjectForm />}
        {active === "employeelist" && (
          <EmployeesList getEmployeeId={setUpdateEmployeeId} />
        )}
        {active === "addemployee" && <AddEmployeeForm />}
        {active === "projectview" && <ProjecEditForm projectId={projectId} />}
        {active === "employeeview" && (
          <EmployeeDetail updateEmpId={employeeId} />
        )}
      </div>
    </div>
  );
}

export default EmployeePanel;
