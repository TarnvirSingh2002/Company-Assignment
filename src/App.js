import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingDetail from "./pages/ListingDetail";
import HomePage from "./Components/HomePage";
import "App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
