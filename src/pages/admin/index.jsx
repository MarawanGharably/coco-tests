import React from 'react';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import { UsersList } from './users';

export default function AdminPage() {
    return (
        <AdminPageLayout title='Users'>
            <UsersList />
        </AdminPageLayout>
    );
}
