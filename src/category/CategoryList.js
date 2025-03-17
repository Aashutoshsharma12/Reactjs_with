import { React, useState, useEffect } from 'react';
import './categoryList.css'; // Create a CSS file for styling
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Example icons
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [showPagination, setShowPagination] = useState(false);
    const [showPagination1, setShowPagination1] = useState(false);
    const navigate = useNavigate();
    // const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const itemsPerPage = 10; // Number of items per page
    const host = process.env.REACT_APP_BACKEND_BASE_URL
    console.log(host, "host----------------")
    const fetchCategories = async (search) => {
        try {
            let url = `${host}api/v1/admin/category/list?page=${currentPage}&perPage=${itemsPerPage}&isActive=all`
            if (search && search !== '' && search != null) {
                url = `${host}api/v1/admin/category/list?page=${currentPage}&perPage=${itemsPerPage}&nameMatched=${search}&isActive=all`
            }
            const response = await axios.get(url,
                {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                }
            );

            setCategories(response.data.data.category_data); // Assuming the API returns an array of categories
            const totalItems = response.data.data.totalCount; // Assuming the API returns total count of items
            setShowPagination(totalItems !== 0);
            setShowPagination1(totalItems <= 10);

            setTotalPages(Math.ceil(totalItems / itemsPerPage)); // Calculate total pages
            setLoading(false);
        } catch (err) {
            console.log(err, "err----------------")
            setError(err.response?.data?.message || "Failed to fetch categories");
            setLoading(false);
            if (err.response?.data?.code === 401) {
                navigate('/login');
            }
        }
    };
    useEffect(() => {
        const search = ''
        fetchCategories(search);
    }, [currentPage]); // Dependency array includes currentPage to refetch data when it changes
    const fetchCategories1 = async (search) => {
        try {
            let url = `${host}api/v1/admin/category/list?page=1&perPage=${itemsPerPage}&isActive=all`
            if (search && search !== '' && search != null) {
                url = `${host}api/v1/admin/category/list?page=1&perPage=${itemsPerPage}&nameMatched=${search}&isActive=all`
            }
            const response = await axios.get(url,
                {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                }
            );

            setCategories(response.data.data.category_data); // Assuming the API returns an array of categories
            const totalItems = response.data.data.totalCount; // Assuming the API returns total count of items
            setShowPagination(totalItems !== 0);
            setShowPagination1(totalItems <= 10);
            setTotalPages(Math.ceil(totalItems / itemsPerPage)); // Calculate total pages
            setLoading(false);
        } catch (err) {
            console.log(err, "err----------------")
            setError(err.response?.data?.message || "Failed to fetch categories");
            setLoading(false);
            if (err.response?.data?.code === 401) {
                navigate('/login');
            }
        }
    };
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    // if (!showPagination) return <p>NotFound</p>;

    return (
        <div className="category-list-container">
            <h2>Category List</h2>
            <input
                type="text"
                placeholder="Search categories..."
                // value={searchTerm}
                onChange={(e) => fetchCategories1(e.target.value)}
                className="search-input"
            />
            <div className="width: 100%; overflow-x:auto">
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Arabic Category Name</th>
                            <th>No. of Sub Categories</th>
                            <th>No. of Sub Sub-Categories</th>
                            <th>Status</th>
                            <th>Last Updated On</th>
                            <th>Specification</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>{category.ar_name}</td>
                                <td>{category.sub_categoryCount}</td>
                                <td>{category.sub_subCategoryCount}</td>
                                <td>{category.isActive}</td>
                                <td>{moment(category.updatedAt).format('YYYY-MM-DD')}</td>
                                <td>specification</td>
                                <td>
                                    <a href={`/categories/edit/${category._id}`}><FaEdit /></a>
                                    <a href={`/categories/view/${category._id}`}><FaEye /></a>
                                    <a href={`/categories/delete/${category._id}`}><FaTrash /></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <div style={{ display: showPagination ? 'none' : 'block' }}>
                        <h3>NotFound</h3>
                    </div>
                </table>
            </div>
            <div className="pagination" id='pagi' style={{ display: showPagination1 ? 'none' : 'block' }}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default CategoryList; 