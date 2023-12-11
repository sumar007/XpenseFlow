import React from "react";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import PrivacyPolicy from "./components/Privacy/Privacy";
import Pricing from "./components/pricing/pricing"; // Import your Pricing component
import AboutUs from "./components/AboutUs";
import Support from "./components/Support/support";
import Terms from "./components/TermsAndConditions/Terms";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
function App() {
  return (
    <Routes>
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/Support" element={<Support />} />
      <Route path="/" element={<Home />} />
      <Route path="/Terms-and-conditions" element={<Terms />} />
      <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
