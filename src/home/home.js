import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate()
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0)
    const [deactiveUsers, setDeactiveUsers] = useState(0)
    const [deleteUsers, setDeleteUsers] = useState(0)
    const [error, setError] = useState(false);
    const [err_message, setErr_message] = useState()
    const dashboard = async () => {
        try {
            const data = await axiosInstance.get('/api/v1/common/auth/dashBoard_api');
            console.log(data.data, "----------------")
            setTotalUsers(data.data.data.totalUsers);
            setActiveUsers(data.data.data.activeUsers);
            setDeactiveUsers(data.data.data.deactiveUsers);
            setDeleteUsers(data.data.data.deleteUsers);
        } catch (err) {
            console.log(err);
            if (err.status == 401) {
                navigate('/admin/login');
            }
            setErr_message(err?.response?.data?.error);
            setError(true);
        }
    }
    useEffect(() => {
        dashboard();
    }, [])
    return (
        <div>
            <h1>Hello, React! 🚀</h1>
            <p>Welcome to Home Page!</p>
            {error && <p>{err_message}</p>}
            <div className="stats-container">
                <div className="stat-item">
                    <h2>Total Users</h2>
                    <p>{totalUsers}</p> {/* Replace 0 with actual active user count */}
                </div>
                <div className="stat-item">
                    <h2>Active Users</h2>
                    <p>{activeUsers}</p> {/* Replace 0 with actual active user count */}
                </div>
                <div className="stat-item">
                    <h2>Deactivated Users</h2>
                    <p>{deactiveUsers}</p> {/* Replace 0 with actual deactivated user count */}
                </div>
                <div className="stat-item">
                    <h2>Delete Users</h2>
                    <p>{deleteUsers}</p> {/* Replace 0 with actual deactivated user count */}
                </div>
                <div className="stat-item">
                    <h2>Total Orders</h2>
                    <p>0</p> {/* Replace 0 with actual total order count */}
                </div>
                <div className="stat-item">
                    <h2>Completed Orders</h2>
                    <p>0</p> {/* Replace 0 with actual completed order count */}
                </div>
            </div>
        </div>
    );
}

export default Home;
