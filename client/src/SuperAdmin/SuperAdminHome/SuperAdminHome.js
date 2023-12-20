import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { MdOutlineAddTask } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTasks } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { GrProjects } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";

import OrganizationList from "../OrganizationList";
import OrganizationForm from "../OrganizationRegistration";
import SubscriptionForm from "../Subscription";
import SubscriptionList from "../SubscriptionList";

import "./SuperAdminHome.css";
import SubscriptionDetailView from "../SubscriptionViewDetail";
import OrganizationViewDetail from "../OrganizationViewDetail";
import { useNavigate } from "react-router-dom";

function UserPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active, setActive] = useState("organizations");
  const [activeId, setId] = useState("");
  const [orgActiveId, setOrgId] = useState("");
  const navigate = useNavigate();

  const setSubscriptionDetail = (id) => {
    setId(id);
    setActive("detail");
  };

  const getOrgId = (orgId) => {
    setOrgId(orgId);
    setActive("org-detail");
  };

  const updateOrg = () => {
    setActive("organizations");
  };

  const updateSubscription = () => {
    setActive("sublist");
  };

  const logoutSuperAdmin = () => {
    sessionStorage.removeItem("token");
    navigate("/superlogin");
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
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
          {/* <MenuItem
            icon={<MdOutlineAddTask />}
            onClick={() => setActive("createtask")}
          >
            Create Tasks
          </MenuItem> */}

          <MenuItem
            icon={<FaTasks />}
            onClick={() => setActive("organizations")}
          >
            Organizations
          </MenuItem>
          {/* <MenuItem
            icon={<FaProjectDiagram />}
            onClick={() => setActive("createproject")}
          >
            Create Projects
          </MenuItem> */}

          <MenuItem icon={<GrProjects />} onClick={() => setActive("orgform")}>
            Add Organization
          </MenuItem>
          <MenuItem icon={<HiUsers />} onClick={() => setActive("sublist")}>
            Subscriptions
          </MenuItem>
          <MenuItem icon={<HiUsers />} onClick={() => setActive("subform")}>
            Add Subscription
          </MenuItem>
          {/* <MenuItem
            icon={<IoMdSettings />}
            onClick={() => setActive("settings")}
          >
            Settings
          </MenuItem> */}
          <MenuItem icon={<IoLogOut />} onClick={logoutSuperAdmin}>
            LogOut
          </MenuItem>
        </Menu>
      </Sidebar>
      <div style={{ width: "100%", height: "max-content" }}>
        {active === "subform" && (
          <SubscriptionForm setSubScription={updateSubscription} />
        )}
        {active === "organizations" && (
          <OrganizationList setOrganizationId={getOrgId} />
        )}
        {active === "orgform" && <OrganizationForm />}
        {active === "sublist" && (
          <SubscriptionList setSubscriptionDetail={setSubscriptionDetail} />
        )}

        {active === "detail" && (
          <SubscriptionDetailView
            subscriptionId={activeId}
            setUpdateSub={updateSubscription}
          />
        )}
        {active === "org-detail" && (
          <OrganizationViewDetail
            orgActive={orgActiveId}
            setUpdate={updateOrg}
          />
        )}
      </div>
    </div>
  );
}

export default UserPanel;
