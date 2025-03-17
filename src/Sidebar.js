import React from "react";
import { NavLink, useLocation } from "react-router-dom"; // Assuming you're using react-router for navigation

function Sidebar() {
    const location = useLocation()
    return (
        < div className="sidebar" >
            <h2>Navigation</h2>
            <ul>
                <li><NavLink to="/admin" className={({ isActive }) => (isActive || location.pathname === "/dashboard") ? "active-link" : "inactive-link"}>Dashborad</NavLink></li>
                <li><NavLink to="/admin/about" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>About</NavLink></li>
                <li><NavLink to="/admin/categories" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Categories</NavLink></li>
                <li><NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Users</NavLink></li>
                <li><NavLink to="/admin/renter_companies" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Renter</NavLink></li>
                {/* Add more links as needed */}
            </ul>
        </div >
    );
}

export default Sidebar; 