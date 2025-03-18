import React, { useState, useEffect } from 'react';
import './userList.css'; // Create a CSS file for styling
import { useNavigate } from 'react-router-dom';
import ListUi from '../helper'
import axiosInstance from '../axiosInstance';
function UserList() {
    // let a = 200, b = 30, c = 10;
    // let temp = a
    // a = b
    // b = temp
    // [a, b, c] = [c, a, b]
    // console.log(a, "ss", b, "s", c)
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [search1, setSearch1] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async (search, searchStatus) => {
        try {
            let url = `api/v1/common/auth/list?page=${currentPage}&perPage=10&search=${search}`
            if (search && search !== '' && search !== null) {
                setCurrentPage(1)
                url = `api/v1/common/auth/list?page=${currentPage}&perPage=10&search=${search}`
            }
            const response = await axiosInstance.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = response.data.data
            setUsers(data.list); // Assuming the API returns an array of users
            setTotalCount(data.count);
            if (data.count !== 0) {
                const total_page = Math.ceil(data.count / 10)
                setTotalPage(total_page)
            }
            setLoading(false);
        } catch (err) {
            setError(err?.response?.data?.error || "Failed to fetch users");
            setLoading(false);
            if (err.status === 401) {
                navigate('/admin/login');
            }
        }
    };
    useEffect(() => {
        const search = ''
        fetchUsers(search, false);
    }, [currentPage]);
    const handle_changePage = (currentPage) => {
        if (currentPage > 0 && currentPage <= totalPages)
            setCurrentPage(currentPage)
    }
    const fetch_users = (event) => {
        event.preventDefault();
        const search = event.target.value
        setSearch1(search);
        setCurrentPage(1);
        fetchUsers(search, true);
    }
    const view = async (userDetails) => {
        navigate(`/admin/users/view?name=${userDetails.name}&phoneNumber=${userDetails.phoneNumber}&email=${userDetails.email}&address=${userDetails.address}&status=${userDetails.status ? 'Active' : 'Inactive'}`)
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <input
                type="text"
                placeholder="Search users..."
                // value={searchTerm}
                onChange={fetch_users}
                className="search-input"
            />
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Delete Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            // user.type = 'user',
                            < ListUi.List key={user._id} user={user} />
                        ))
                    }
                </tbody>
            </table>
            <div style={{ display: totalCount === 0 ? 'block' : 'none' }}>
                <h3>
                    NotFound
                </h3>
            </div>
            <div className="pagination" id='pagi' style={{ display: totalCount === 0 || totalCount <= 10 ? 'none' : 'block' }}>
                <button onClick={() => handle_changePage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handle_changePage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                    Next
                </button>
            </div>
        </div >
    );
}

export default UserList; 