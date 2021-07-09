import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../APImethods/UsersAPI';
import RecordsList from '../../../HOC/RecordsList';
import { NavLink } from 'react-router-dom';
import { Row } from 'react-bootstrap';

export default function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((res) => {
                setUsers(res);
                console.log('>>Users', res);
            })
            .catch();
    }, []);

    return (
        <>
            <h1>Users</h1>
            <Row className="justify-content-between">
                <SearchBox />

                <NavLink to={`/admin/users/create`} style={{ fontSize: '1.5em', fontWeight: '600' }}>
                    Create <i className="fas fa-user"></i>
                </NavLink>
            </Row>

            <RecordsList className="my-4" headers={['#', 'User Name', 'Email', '']} records={users} ItemComponent={UserListItem} />
        </>
    );
}

const UserListItem = ({ data, idx }) => {
    return (
        <tr>
            <td>{idx}</td>
            <td>{data.given_name || data.Username}</td>
            <td>{data.email}</td>
            <td>
                <NavLink to={`/admin/users/${data.Username}`}>
                    <i className="fas fa-pencil-alt"></i>
                </NavLink>
            </td>
        </tr>
    );
};

const SearchBox = () => {
    return <div></div>;
};
