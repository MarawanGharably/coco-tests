import React from 'react';
import AdminPageLayout from '../../../components/layouts/AdminPageLayout';
import RecordsList from '../../../components/HOC/RecordsList';
import { getUserStores } from '../../../APImethods';
import Link from 'next/link';

export default function StoresPage() {
    return (
        <AdminPageLayout title="Stores">
            <RecordsList fetchRecordsFN={getUserStores} className="my-4" headers={['#', 'Name', 'status', '']} ItemComponent={StoresListItem} />
        </AdminPageLayout>
    );
}

const StoresListItem = ({ data, idx }) => {
    const storeId = data._id.$oid;
    return (
        <tr>
            <td>{idx}</td>
            <td>{data.name}</td>
            <td>{data.status}</td>
            <td>
                <Link href={`/admin/stores/${storeId}`}>
                    <i className="fas fa-pencil-alt"></i>
                </Link>
            </td>
        </tr>
    );
};
