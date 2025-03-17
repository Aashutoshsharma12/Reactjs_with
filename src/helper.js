
import moment from "moment";
import { FaEye, FaSync, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function User({ user }) {
    return <li>{user.name}</li>;
}
const useViewUser = () => {
    const navigate = useNavigate()
    return (userData) => {
        navigate('/users/view', { state: { user: userData } });
    };
}
/**
 * child component
 * @param {*} param0 
 * @returns 
 */
function List({ user }) {
    let delete1;
    let status;
    if (user.type === 'user') {
        delete1 = '/users/delete/'
        status = '/users/update-status/'
    }
    const viewUser = useViewUser();

    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.address}</td>
            <td>{moment(user.createdAt).format('YYYY-MM-DD, HH:mm')}</td>
            <td>{user.isActive ? 'Active' : "Inactive"}</td>
            <td>
                <a onClick={() => viewUser({ userId: user._id, name: user.name, phoneNumber: user.phoneNumber, address: user.address, email: user.email ? user.email : 'N/A', status: user.isActive })}><FaEye /></a>
                <a href={`${delete1}${user._id}`}><FaTrash /></a>
                <a href={`${status}${user._id}`}><FaSync /></a>
                {/* create a onclick*/}
            </td>
        </tr >
    );
}

export default {
    User,
    List
}
