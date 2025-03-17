import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css'; // Create a CSS file for styling

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="app-header">
            <script src="http://localhost:8097"></script>
            {/* <h1>My Application</h1> */}
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </header>
    );
}

export default Header; 