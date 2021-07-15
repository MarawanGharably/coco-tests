import React from 'react';
import UserGroupsList from './UserGroupsList';
import UserGroupForm from './NewUserGroupForm';
import { Route, Switch } from 'react-router-dom';
import Layout from "../../../layouts/Layout";

export default function UserGroupsPage() {
    return (<Layout>
            <Switch>
                <Route exact path={'/admin/user-groups'}>
                    <UserGroupsList />
                </Route>
                {/*<Route path={`/admin/stores/create`}>*/}
                {/*<NewStoreForm mode="create" />*/}
                {/*</Route>*/}
                <Route path={`/admin/user-groups/:storeId`}>
                    <UserGroupForm />
                </Route>
            </Switch>
    </Layout>
    );
}
