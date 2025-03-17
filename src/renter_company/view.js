import React from 'react';
import { useLocation } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/auth_context';
function ViewCompany() {
    // const Auth = useContext(AuthContext);
    const location = useLocation();
    const userData = location.state?.user; // Extract user data
    const name = userData.name;
    const phoneNumber = userData.phoneNumber;
    const email = userData.email;
    const address = userData.address;
    const status = userData.status
    // const [error, setError] = useState('');

    return (
        <div className="edit-category-container">
            <h2>View Company</h2>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <form>
                <div className="form-group">
                    <label htmlFor="categoryName">Company Name</label>
                    <input
                        type="text"
                        id="userName"
                        defaultValue={name} disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryName">Email</label>
                    <input
                        type="text"
                        id="email"
                        defaultValue={email ? email : 'N/A'}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryName">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        defaultValue={phoneNumber}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryName">Address</label>
                    <input
                        type="text"
                        id="address"
                        defaultValue={address}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        defaultValue={status}
                        disabled
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

export default ViewCompany; 