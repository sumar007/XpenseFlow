import React from "react";
import Home from "./components/Home/Home.js";
import { Route, Routes } from "react-router-dom";
import PrivacyPolicy from "./components/Pages/Privacy/Privacy";
import AboutUs from "./components/Pages/AboutUs";
import Support from "./components/Pages/Support/support";
import Terms from "./components/Pages/TermsAndConditions/Terms";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Verify from "./components/Verify/verify.js";
import Pricing from "./components/Pages/pricing/pricing.js";
import SubscriptionForm from "./SuperAdmin/Subscription/index.js";

import SuperadminSignup from "./SuperAdmin/SuperAdminSignUp/superadminSignup.js";
import SuperadminLogin from "./SuperAdmin/SuperAdminLogin/superadminLogin.js";
import SuperadminVerify from "./SuperAdmin/SuperAdminVerify/superadminVerify.js";
import SubscriptionList from "./SuperAdmin/SubscriptionList/index.js";
import OrganizationForm from "./SuperAdmin/OrganizationRegistration/index.js";
import OrganizationList from "./SuperAdmin/OrganizationList/index.js";
import SuperAdminHome from "./SuperAdmin/SuperAdminHome/SuperAdminHome.js";

import SubscriptionDetailView from "./SuperAdmin/SubscriptionViewDetail/index.js";
import OrganizationViewDetail from "./SuperAdmin/OrganizationViewDetail/index.js";

import AdminLogin from "./Admin/AdminLogin/index.js";
import AdminPanel from "./Admin/Adminpanel/index.js";
import UserRoleForm from "./Admin/AddRole.js/index.js";

import SuperForgotPassword from "./SuperAdmin/SuperForgotPassword/SuperForgotPassword.js";
import ProtectedRoute from "./SuperAdmin/SuperAdminProtectedRoute/SuperAdminProtectedRoute.js";

import EmployeeDetail from "./Admin/EmployeeDetail/index.js";
import TimeSheetForm from "./Admin/AddTimeSheet/index.js";
import UserPanel1 from "./Admin/UserPanel/index.js";
import EmployeePanel from "./Employee/EmployeePanel/EmployeePanel.js";
import TimeSheet from "./Employee/TimeSheet/TimeSheet.js";

function App() {
  return (
    <Routes>
      <Route path="/UserPanel1" element={<UserPanel1 />} />

      <Route
        path="/superhome"
        element={
          <ProtectedRoute>
            <SuperAdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superlogin"
        element={
          <ProtectedRoute>
            <SuperadminLogin />
          </ProtectedRoute>
        }
      />

      <Route path="/TimeSheetForm" element={<TimeSheetForm />} />
      <Route
        path="/addrole"
        element={
          <ProtectedRoute>
            {" "}
            <UserRoleForm />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/adminpanel"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adminlogin"
        element={
          <ProtectedRoute>
            <AdminLogin />{" "}
          </ProtectedRoute>
        }
      />
      <Route path="/timesheet" element={<TimeSheet />} />
      <Route path="/employeepanel" element={<EmployeePanel />} />
      <Route path="/superSignup" element={<SuperadminSignup />} />
      <Route path="/super-forgot" element={<SuperForgotPassword />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/Support" element={<Support />} />
      <Route path="/" element={<Home />} />
      <Route path="/Terms-and-conditions" element={<Terms />} />
      <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
