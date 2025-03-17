import React, { useState, useEffect } from 'react';
import './userList.css'; // Create a CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListUi from '../helper'
function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [search1, setSearch1] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    /**
     * Fetches the list of users from the API.
     * 
     * @param {string} search The search query to filter the users.
     * @param {boolean} searchStatus Whether to set the current page to 1 or not.
     */
    const fetchUsers = async (search, searchStatus) => {
        try {
            let url = `${process.env.REACT_APP_BACKEND_BASE_URL}api/v1/admin/user/list?role=user&page=${currentPage}&perPage=10&nameMatched=${search1}`
            if (search && search !== '' && search !== null) {
                setCurrentPage(1)
                url = `${process.env.REACT_APP_BACKEND_BASE_URL}api/v1/admin/user/list?role=user&page=1&perPage=10&nameMatched=${search}`
            }
            const response = await axios.get(url, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                }
            });
            const data = response.data.data
            setUsers(data.findUserDetails); // Assuming the API returns an array of users
            setTotalCount(data.totalDocument);
            if (data.totalDocument !== 0) {
                const total_page = Math.ceil(data.totalDocument / 10)
                setTotalPage(total_page)
            }
            setLoading(false);
        } catch (err) {
            setError(err.message || "Failed to fetch users");
            setLoading(false);
            if (err.response?.data?.code === 401) {
                navigate('/login');
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
        console.log(search, "search----------")
        if (search && search !== '' && search !== null) {
            setSearch1(search);
            setCurrentPage(1);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            fetchUsers(search, true);
        }
    }
    const view = async (userDetails) => {
        // href = {`/users/view/${user._id}`
        console.log(userDetails, "id-----------------------------------")
        // setUser({ name: userDetails.name, phoneNumber: userDetails.phoneNumber, email: userDetails.email, address: userDetails.address })
        navigate(`/users/view?name=${userDetails.name}&phoneNumber=${userDetails.phoneNumber}&email=${userDetails.email}&address=${userDetails.address}&status=${userDetails.status ? 'Active' : 'Inactive'}`)
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