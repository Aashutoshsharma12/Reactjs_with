import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { clear_localStorage } from '../header/helper';

function EditCategory() {
    const { id } = useParams(); // Get category ID from URL
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [arabicCategoryName, setArabicCategoryName] = useState('');
    const [status, setStatus] = useState('Active');
    const [imageUrl, setImageUrl] = useState(''); // State for image URL
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch category details to pre-fill the form
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}api/v1/admin/category/list/${id}`, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                });
                const category = response.data.data;
                setCategoryName(category.name);
                setArabicCategoryName(category.ar_name);
                setStatus(category.isActive ? 'Active' : 'Inactive');
                setImageUrl(category.image); // Assuming the API returns an image URL
            } catch (err) {
                setError(err.response.data.error)
                if (err.response.data.code === 401) {
                    clear_localStorage();
                    navigate('/admin/login')
                }
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}api/v1/admin/category/edit/${id}`, {
                name: categoryName,
                ar_name: arabicCategoryName,
                isActive: status === 'Active',
                image: imageUrl
            }, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                }
            });
            navigate('/admin/categories'); // Redirect to category list after successful update
        } catch (err) {
            setError(err.response.data.error)
            if (err.response.data.code === 401) {
                clear_localStorage();
                navigate('/login')
            }
        }
    };

    return (
        <div className="edit-category-container">
            <h2>Edit Category</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="arabicCategoryName">Arabic Category Name:</label>
                    <input
                        type="text"
                        id="arabicCategoryName"
                        value={arabicCategoryName}
                        onChange={(e) => setArabicCategoryName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                {imageUrl && (
                    <div className="form-group">
                        <label>Category Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const image = e.target.files[0];
                                if (image.size < 10 * 1024 * 1024) {
                                    // setImageUrl(URL.createObjectURL(image));
                                    try {
                                        const formData = new FormData();
                                        formData.append('image1', image);
                                        const data = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}api/v1/upload?type=Category`, formData,
                                            {
                                                headers: {
                                                    'Authorization': localStorage.getItem('token'),
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            });
                                        setImageUrl(data.data.data.url);
                                    } catch (err) {
                                        console.log(err.response.data.error, "slslsls");
                                        alert('Failed to upload image : ', err?.response?.data?.error);
                                    }
                                } else {
                                    alert('Image size should be less then 10MB');
                                }
                            }}
                        />
                        <img src={imageUrl} style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditCategory; 