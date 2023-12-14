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
import SubscriptionList from "./SuperAdmin/SubscriptionList/index.js";
import OrganizationForm from "./SuperAdmin/OrganizationRegistration/index.js";
import OrganizationList from "./SuperAdmin/OrganizationList/index.js";
function App() {
  return (
    <Routes>
      <Route path="/organizationList" element={<OrganizationList />} />
      <Route path="/organizationRegistration" element={<OrganizationForm />} />
      <Route path="/subscriptionlist" element={<SubscriptionList />} />
      <Route path="/SubscriptionForm" element={<SubscriptionForm />} />
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
