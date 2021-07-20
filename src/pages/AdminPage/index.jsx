import React from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import UsersPage from './Users';
import StoresPage from './Stores';
import UserGroupsPage from './UserGroups';
import Layout from "../../layouts/Layout";
import './AdminPage.scss';


export default function AdminPage(){
    const history  = useHistory();
    const { pathname } = history.location;
    const pathPrefix = '/admin';
    const path = pathname.replace('/admin','');


    return (
            <Layout fluid='xl'>
                <div id="admin-page" className="flex full-width">
                    <NavBar>
                        <NavBar.Item name="USERS" pathName={`${pathPrefix}/users`} />
                        <NavBar.Item name="Policies/User Groups" pathName={`${pathPrefix}/user-groups`} />
                        <NavBar.Item name="STORES" pathName={`${pathPrefix}/stores`} />
                    </NavBar>


                    {path=='' && <AdminDashboard />}
                    {pathname.includes('/admin/users')  && <UsersPage />}
                    {pathname.includes('/admin/user-groups')  && <UserGroupsPage />}
                    {pathname.includes('/admin/stores')  && <StoresPage />}

                </div>
            </Layout>
    );
};

const AdminDashboard=()=>{
    return(<Switch>
        <Route exact path="/admin">
            <Redirect to='/admin/users' />
        </Route>
    </Switch>)
}


