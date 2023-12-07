
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pricing from './components/pricing/pricing'; // Import your Pricing component

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/pricing" element={<Pricing/>} /> */}
        </Routes>
    </Router>
  );
}

export default App;
