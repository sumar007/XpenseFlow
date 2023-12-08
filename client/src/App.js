import React from "react";
import { Route, Routes } from "react-router-dom";
import Pricing from "./components/pricing/pricing"; // Import your Pricing component
import AboutUs from "./components/AboutUs";
import Support from "./components/Support/support";

function App() {
  return (
    <Routes>
      <Route path="/about" element={<AboutUs />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}

export default App;
