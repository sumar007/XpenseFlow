import "./App.css";
import Home from "./components/Home/Home";
import Terms from "./components/TermsAndConditions/Terms";
import PrivacyPolicy from "./components/Privacy/Privacy";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Home />
        <Terms /> */}
        <PrivacyPolicy />
      </BrowserRouter>
    </>
  );
}

export default App;
