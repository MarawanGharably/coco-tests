import React from 'react';
import Link from 'next/link';
import { Row } from 'react-bootstrap';
import RecordsList from '../../../components/HOC/RecordsList';
import AdminPageLayout from '../../../components/layouts/AdminPageLayout';
import { getUsers } from '../../../APImethods';

export default function UsersPage() {
    return (
        <AdminPageLayout title='Users'>
            <UsersList/>
        </AdminPageLayout>
    );
}

export const UsersList = ()=>{
    return(<>
        <Row className="justify-content-between no-margins">
            <SearchBox />

            <Link href={`/admin/users/create`} style={{ fontSize: '1em', fontWeight: '600' }}>
                <span>Create <i className="fas fa-user"></i></span>
            </Link>
        </Row>

        <RecordsList
            fetchRecordsFN={getUsers}
            className="my-4"
            headers={['#', 'User Name', 'Email', '']}
            ItemComponent={UserListItem}
        />
    </>)
}

const UserListItem = ({ data, idx }) => {
    return (
        <tr>
            <td>{idx}</td>
            <td>{data.given_name || data.Username}</td>
            <td>{data.email}</td>
            <td>
                <Link href={`/admin/users/${data.Username}`}>
                    <i className="fas fa-pencil-alt"></i>
                </Link>
            </td>
        </tr>
    );
};

const SearchBox = () => {
    return <div></div>;
};
