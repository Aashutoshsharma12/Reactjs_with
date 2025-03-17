import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../home/home";
import About from '../about/about'
import Sidebar from "../Sidebar";
import '../styles.css';
import Login from "../login/login";
import CategoryList from '../category/CategoryList';
import EditCategory from '../category/EditCategory';
import ViewCategory from '../category/viewCategory';
import LandingPage from '../landing/LandingPage';
import Header from '../header/Header';
import UserList from '../user/UserList';
import ViewUser from "../user/ViewUser";
import List from "../renter_company/list";
import ViewCompany from '../renter_company/view';
import { AuthContext } from "../context/auth_context";
// export default App;
function App() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="app-container">
        {isLoggedIn && <Header />}
        <div style={{ display: 'flex', gap: "10px" }}>
          {isLoggedIn && location.pathname !== '/login' && <div className="" style={{ minWidth: "230px" }}><Sidebar /></div>}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />
              <Route path="/categories/view/:id" element={<ViewCategory />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/view" element={<ViewUser />} />
              <Route path="/renter_companies" element={<List />} />
              <Route path="/ViewCompany" element={<ViewCompany />} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
