import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import EditUserStoresPage from './EditUserStoresPage';
import UsersPage from './Users';
import StoresPage from './Stores';
import UserGroupsPage from './UserGroups';
import Layout from "../../layouts/Layout";
import './AdminPage.scss';


export default function AdminPage(){
    const history  = useHistory();
    const { pathname } = history.location;
    const pathPrefix = '/admin';
    const path = history.location.pathname.replace('/admin','');


    return (
            <Layout fluid='xl'>
                <div id="admin-page" className="flex full-width">
                    <NavBar>
                        <NavBar.Item name="USERS" pathName={`${pathPrefix}/users`} />
                        <NavBar.Item name="User Groups/Policies" pathName={`${pathPrefix}/user-groups`} />
                        <NavBar.Item name="STORES" pathName={`${pathPrefix}/stores`} />
                        <NavBar.Item name="EDIT USER STORES" pathName={`${pathPrefix}/editUserStores`} />
                    </NavBar>


                    {path=='' && <AdminDashboard />}
                    {pathname.includes('/admin/user-groups')  && <UserGroupsPage />}
                    {pathname.includes('/admin/users')  && <UsersPage />}
                    {pathname.includes('/admin/stores')  && <StoresPage />}
                    {path=='/editUserStores' && <EditUserStoresPage />}

                </div>
            </Layout>
    );
};

const AdminDashboard=()=>{
    return(<Layout title='Admin Dashboard'>
        {/*<h1>Admin Dashboard</h1>*/}
        <p></p>
    </Layout>)
}


