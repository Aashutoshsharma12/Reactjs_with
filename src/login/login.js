import { React, useState } from "react";
import './login.css'; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    // Email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError(""); // Reset error

        // Validate email format
        if (!validateEmail(email)) {
            setError("Invalid email format");
            return;
        }

        try {
            const response = await axiosInstance.post("api/v1/admin/auth/adminLogin", {
                email,
                password,
            });
            console.log(response.data.data, 'ldldldld')
            localStorage.setItem("token", response.data.data.token); // Store token
            navigate('/admin/dashboard')
        } catch (err) {
            console.log(err, "ddkd", err.code)
            if (err.code === 400) {
                setError(err.response?.data?.error || "Login Failed!");
            }
            setError(err.response?.data?.error || "Login Failed!");
        }
    };
    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-form">
                    <h2>Login</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login; 