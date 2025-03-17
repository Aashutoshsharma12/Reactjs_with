import React from "react";
import { NavLink, useLocation } from "react-router-dom"; // Assuming you're using react-router for navigation

function Sidebar() {
    const location = useLocation()
    return (
        < div className="sidebar" >
            <h2>Navigation</h2>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => (isActive || location.pathname === "/dashboard") ? "active-link" : "inactive-link"}>Dashborad</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>About</NavLink></li>
                <li><NavLink to="/categories" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Categories</NavLink></li>
                <li><NavLink to="/users" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Users</NavLink></li>
                <li><NavLink to="/renter_companies" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Renter</NavLink></li>
                {/* Add more links as needed */}
            </ul>
        </div >
    );
}

export default Sidebar; 