import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
function EditUser() {
    const inputRef = useRef(null); // Create a ref

    // const handleFocus = () => {
    //     inputRef.current.focus(); // Directly access input element
    // };


    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.user; // Extract user data
    console.log(userData, "dldldl")
    const address = userData.address;
    const status = userData.status
    const [error, setError] = useState(null)
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
    const [userId, setUserId] = useState(userData.userId);
    // useEffect(() => {
    //     setName(name1);
    //     setEmail(email1);
    //     setPhoneNumber(phoneNumber1);
    // }, [])
    // const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.patch('api/v1/common/auth/edit', { name: name, email: email, phoneNumber: phoneNumber, userId: userId });
            navigate('/admin/users');
        } catch (err) {
            if (err.status === 401) {
                setError(err?.response?.data?.error);
                navigate('/admin/login');
            }
            setError(err?.response?.data?.error);
        }
    }
    return (
        <div className="edit-category-container">
            <h2>Edit User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryName">User Name</label>
                    <input
                        // ref={inputRef}
                        type="text"
                        id="userName"
                        value={name} required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryName">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email ? email : 'N/A'} required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryName">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        required
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryName">Address</label>
                    <input
                        type="text"
                        id="address"
                        defaultValue={address} disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        defaultValue={status} disabled
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditUser; 