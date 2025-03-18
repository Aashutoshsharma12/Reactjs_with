import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { clear_localStorage } from '../header/helper';
import axiosInstance from '../axiosInstance';


function ViewCategory() {
    const { id } = useParams(); // Get category ID from URL
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("")
    const [ar_categoryName, setAr_categoryName] = useState("")
    const [status, setStatus] = useState(true)
    const [imageUrl, setImageUrl] = useState("")
    const [error, setError] = useState("")
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get(`api/v1/admin/category/list/${id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setCategoryName(response.data.data.name);
                setAr_categoryName(response.data.data.ar_name);
                setImageUrl(response.data.data.image);
                setStatus(response.data.data.isActive)
            } catch (err) {
                setError(err.response.data.error)
                if (err.response.data.code === 401) {
                    clear_localStorage();
                    navigate('/admin/login')
                }
            }
        }
        fetchCategories();
    }, [id])
    return (
        <div className="edit-category-container">
            <h2>View Category</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form>
                <div className="form-group">
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName} disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="arabicCategoryName">Arabic Category Name:</label>
                    <input
                        type="text"
                        id="arabicCategoryName"
                        value={ar_categoryName} disabled

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status ? "Active" : "Inactive"} disabled>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                {imageUrl && (
                    <div className="form-group">
                        <label>Category Image:</label>
                        <img src={imageUrl} alt="Category" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
            </form>
        </div>
    );
}

export default ViewCategory; 