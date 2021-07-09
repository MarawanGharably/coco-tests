import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../../../layouts/Layout';
import UserForm from './UserForm';
import NewUserForm from './NewUserForm';
import UsersList from './UsersList';

export default function UsersPage() {
    return (
        <Layout>
            <Switch>
                <Route exact path={'/admin/users'}>
                    <UsersList />
                </Route>
                <Route path={`/admin/users/create`}>
                    <NewUserForm mode="create" />
                </Route>
                <Route path={`/admin/users/:userId`}>
                    <UserForm />
                </Route>
            </Switch>
        </Layout>
    );
}
