import { React, useState } from "react";
import './login.css'; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
const dev_host = process.env.REACT_APP_BACKEND_BASE_URL
const local_host = process.env.Backend_local_baseUrl
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
            const response = await axios.post(dev_host + "api/v1/admin/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.data.token); // Store token
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed!");
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