import React, { useEffect } from 'react';
import './landingPage.css'; // Create a CSS file for styling
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard'); // Redirect to home page if token exists
        }
    }, [navigate]);

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page-container">
            <button className="login-button" onClick={handleLoginClick}>
                Login
            </button>
            <div className="image-gallery">
                <img src="/images/image1.jpg" alt="" className="gallery-image" />
                <img src="/images/image2.jpg" alt="" className="gallery-image" />
                <img src="/images/image3.jpg" alt="" className="gallery-image" />
                {/* Add more images as needed */}
            </div>
        </div>
    );
}

export default LandingPage; 