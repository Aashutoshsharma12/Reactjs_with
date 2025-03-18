
import moment from "moment";
import { useState } from "react";
import { FaEye, FaSync, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "./axiosInstance";

function User({ user }) {
    return <li>{user.name}</li>;
}
const useViewUser = () => {
    const navigate = useNavigate()
    return (userData) => {
        navigate('/admin/users/view', { state: { user: userData } });
    };
}
const useEditUser = () => {
    const navigate = useNavigate()
    return (userData) => {
        navigate('/admin/users/edit', { state: { user: userData } });
    };
}
/**
 * child component
 * @param {*} param0 
 * @returns 
 */
function List({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    let delete1;
    let status;
    // if (user.type === 'user') {
    delete1 = '/admin/users/delete/'
    status = '/admin/users/edit/'
    // }
    const viewUser = useViewUser();
    const editUser = useEditUser();
    // Open modal when delete icon is clicked
    const handleDeleteClick = (userId) => {
        console.log('dkdkdkkdkdkdkdkkd---------------------------')
        setSelectedUser(userId);
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };
    // Confirm Delete
    const handleConfirmDelete = async () => {
        if (!selectedUser) return;
        try {
            await axiosInstance.patch(`/api/v1/common/auth/edit`, { userId: selectedUser, isDelete: true });
            alert("User deleted successfully!");
            handleCloseModal();
            window.location.reload();  // Refresh the whole page
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };
    return (
        <>
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>{moment(user.createdAt).format('YYYY-MM-DD, HH:mm')}</td>
                <td>{user.isActive ? 'Active' : "Inactive"}</td>
                <td>{user.isDelete ? 'True' : 'False'}</td>
                <td>
                    <a onClick={() => viewUser({ userId: user._id, name: user.name, phoneNumber: user.phoneNumber, address: user.address, email: user.email ? user.email : 'N/A', status: user.isActive })}><FaEye /></a>
                    <a onClick={() => handleDeleteClick(user._id)}><FaTrash /></a>
                    <a onClick={() => editUser({ userId: user._id, name: user.name, phoneNumber: user.phoneNumber, address: user.address, email: user.email ? user.email : 'N/A', status: user.isActive })}><FaPencil /></a>
                    {/* <a href={`${status}${user._id}`}><FaPencil /></a> */}
                    {/* create a onclick*/}
                </td>
            </tr >
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete {selectedUser?.name}?</p>
                        <button onClick={handleConfirmDelete} className="confirm-btn">Yes, Delete</button>
                        <button onClick={handleCloseModal} className="cancel-btn">Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default {
    User,
    List
}
