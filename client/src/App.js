import "./App.css";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <Routes>
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
