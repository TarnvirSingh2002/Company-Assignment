// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./Components/HomePage";
// import "./App.css";
// import Login from "./Components/Login";
// import Register from "./Components/Register";
// import ListingDetail from "./Components/ListingDetail";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/listing/:id" element={<ListingDetail />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingDetailPage from './pages/ListingDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HostDashboardPage from './pages/HostDashboardPage'; // Optional
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/Common/PrivateRoute'; // For protected routes
import HostRoute from './components/Common/HostRoute'; // For host-only routes

function App() {
  return (
    <Router>
      <Navbar />
      <main className="py-3"> {/* Simple padding for content */}
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected Routes */}
          <Route path="/profile" element={<PrivateRoute><HostDashboardPage /></PrivateRoute>} />
          {/* Host Specific Routes */}
          <Route path="/host/dashboard" element={<HostRoute><HostDashboardPage /></HostRoute>} />
          <Route path="/host/listings/new" element={<HostRoute><HostDashboardPage /></HostRoute>} /> {/* Example */}
          <Route path="/host/listings/edit/:id" element={<HostRoute><HostDashboardPage /></HostRoute>} /> {/* Example */}
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
