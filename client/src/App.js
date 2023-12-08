import "./App.css";
import Home from "./components/Home/Home";
import Terms from "./components/TermsAndConditions/Terms";
import PrivacyPolicy from "./components/Privacy/Privacy";
import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Terms-and-conditions" element={<Terms />} />
      <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
