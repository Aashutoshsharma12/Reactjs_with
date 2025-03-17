import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaSync, FaTrash } from 'react-icons/fa';
import moment from 'moment';
// import { useContext } from 'react';
// import { AuthContext } from '../context/auth_context';
import axiosInstance from '../axiosInstance';

const List = () => {
    // const Auth = useContext(AuthContext);
    const navigate = useNavigate()
    const [error, setError] = useState();
    const [search, setSearch] = useState();
    const [data1, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [totalCount, setTotalCount] = useState();
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState(false);
    const fetchData = async (search) => {
        try {
            let url = `api/v1/admin/user/list?page=${currentPage}&perPage= 10&role=renter_user&isActive=all`
            if (search && search !== '' && search !== null) {
                url = `api/v1/admin/user/list?page=${currentPage}&perPage= 10&role=renter_user&isActive=all&nameMatched=${search}`
            }

            const list = await axiosInstance.get(url,
                {
                    headers: {
                        // 'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                }
            );
            setLoading(false);
            const data = list.data.data.findUserDetails;
            setData(data);
            setTotalCount(list.data.data.totalDocument);
            setTotalPages(Math.ceil(list.data.data.totalDocument / 10));
        } catch (err) {
            setLoading(false);
            setErrorStatus(true);
            setError(err.response?.data?.message || 'Something went wrong');
        }
    }
    const view = () => {
        return (data) => {
            // Auth.setUser(data);
            navigate('/ViewCompany', { state: { user: data } });
        }
    }
    useEffect(() => {
        fetchData(search);
    }, [currentPage, search]);
    function handle_changePage(currentPage) {
        if (currentPage > 0 && currentPage <= totalPages) {
            setCurrentPage(currentPage);
        }
    }
    const searchHandler = (data) => {
        setSearch(data)
        setCurrentPage(1)
    }
    const viewUser = view();

    if (loading) return <h1>loading---</h1>
    if (errorStatus) return <h1>{error}</h1>
    return (
        <div className="user-list-container">
            <h2>Renter List</h2>
            <input
                type="text"
                placeholder="Search users..."
                // value={searchTerm}
                onChange={(e) => searchHandler(e.target.value)}
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
                        data1.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.address}</td>
                                <td>{moment(user.createdAt).format('YYYY-MM-DD, HH:mm')}</td>
                                <td>{user.isActive ? 'Active' : "Inactive"}</td>
                                <td>
                                    <a onClick={() => viewUser({ userId: user._id, name: user.name, phoneNumber: user.phoneNumber, address: user.address, email: user.email ? user.email : 'N/A', status: user.isActive })}><FaEye /></a>
                                    <a href={`/users/delete/${user._id}`}><FaTrash /></a>
                                    <a href={`/users/update-status/${user._id}`}><FaSync /></a>
                                    {/* create a onclick*/}
                                </td>
                            </tr>
                        ))
                    }
                </tbody >
            </table >
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
};

export default List;
