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
import EditUser from "../user/edit";
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
          {isLoggedIn && location.pathname !== '/admin/login' && <div className="" style={{ minWidth: "230px" }}><Sidebar /></div>}
          <div className="main-content">
            <Routes>
              <Route path="/admin/" element={<LandingPage />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<Home />} />
              <Route path="/admin/about" element={<About />} />
              <Route path="/admin/categories" element={<CategoryList />} />
              <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
              <Route path="/admin/categories/view/:id" element={<ViewCategory />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/users/view" element={<ViewUser />} />
              <Route path="/admin/users/edit" element={<EditUser />} />
              <Route path="/admin/renter_companies" element={<List />} />
              <Route path="/admin/renter_companies/view" element={<ViewCompany />} />
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
