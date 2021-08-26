import React from 'react';
import AdminPageLayout from "../../../components/layouts/AdminPageLayout";
import {Row} from "react-bootstrap";
import Link from 'next/link'
import RecordsList from "../../../components/HOC/RecordsList";

//API Methods
import {getPolicies} from "../../../APImethods";

export default function UserGroupsPage() {
    return (<AdminPageLayout title='User Groups / Policies'>

        <Row className="justify-content-end text-end">
            <Link href={`/admin/user-groups/create`} style={{ fontSize: '1em', fontWeight: '600' }}>
              <a className='text-decoration-none'>Create New Policy</a>
            </Link>
        </Row>

        <RecordsList
            fetchRecordsFN={getPolicies}
            className="my-4"
            headers={['#', 'Store']}
            ItemComponent={UserGroupListItem}
        />
    </AdminPageLayout>
    );
}

const UserGroupListItem = ({ data, idx }) => {
    return (
        <tr>
            <td>{idx}</td>
            <td>{data.name}</td>
        </tr>
    );
};