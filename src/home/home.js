import React from "react";

function Home() {
    return (
        <div>
            <h1>Hello, React! 🚀</h1>
            <p>Welcome to Home Page!</p>
            <div className="stats-container">
                <div className="stat-item">
                    <h2>Active Users</h2>
                    <p>0</p> {/* Replace 0 with actual active user count */}
                </div>
                <div className="stat-item">
                    <h2>Deactivated Users</h2>
                    <p>0</p> {/* Replace 0 with actual deactivated user count */}
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
