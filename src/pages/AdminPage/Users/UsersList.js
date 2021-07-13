import React from 'react';
import RecordsList from '../../../HOC/RecordsList';
import { NavLink } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { getUsers } from '../../../APImethods/UsersAPI';


export default function UsersList() {
    return (
        <>
            <h1>Users</h1>
            <Row className="justify-content-between">
                <SearchBox />

                <NavLink to={`/admin/users/create`} style={{ fontSize: '1em', fontWeight: '600' }}>
                    Create <i className="fas fa-user"></i>
                </NavLink>
            </Row>

            <RecordsList
                fetchRecordsFN={getUsers}
                className="my-4"
                headers={['#', 'User Name', 'Email', '']}
                ItemComponent={UserListItem}
            />
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
