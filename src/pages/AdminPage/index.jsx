import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/nav-bar/NavBar';
import NavBarItem from '../../components/nav-bar/NavBarItem/NavBarItem';
import PoliciesPage from './PoliciesPage';
import EditUserStoresPage from './EditUserStoresPage';
import UsersPage from './Users';
import Layout from "../../layouts/Layout";

export default function AdminPage(){
    const history  = useHistory();
    const { pathname } = history.location;

    const pathPrefix = '/admin';
    const path = history.location.pathname.replace('/admin','');
    console.log('path', path);

    return (
            <Layout fluid='xl'>
                <div id="admin-page" className="flex full-width">
                    <NavBar>
                        <NavBarItem
                            name="CREATE POLICIES"
                            pathName={pathPrefix}
                        />

                        <NavBarItem
                            name="USERS"
                            pathName={`${pathPrefix}/users`}
                        />

                        <NavBarItem
                            name="EDIT USER STORES"
                            pathName={`${pathPrefix}/editUserStores`}
                        />
                    </NavBar>


                    {path=='' && <PoliciesPage />}
                    {pathname.includes('/admin/users')  && <UsersPage />}
                    {path=='/editUserStores' && <EditUserStoresPage />}

                </div>
            </Layout>
    );
};


