import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import BodyWrapper from '../../layouts/body-wrapper/BodyWrapper';
import NavBar from '../../components/nav-bar/NavBar';
import NavBarItem from '../../components/nav-bar/NavBarItem';
import CreateUser from './CreateUser';
import PoliciesPage from './PoliciesPage';

const AdminPage = () => {
    const pathPrefix = '/admin/';
    const policiesPath = `${pathPrefix}policies`;
    const usersPath = `${pathPrefix}users`;
    return (
        <>
            <BodyWrapper>
                <div id="admin-page" className="flex full-width">
                    <NavBar>
                        <NavBarItem
                            name="CREATE POLICIES"
                            pathName={policiesPath}
                        />
                        <NavBarItem
                            name="CREATE USERS"
                            pathName={usersPath}
                        />
                    </NavBar>
                    <Switch>
                        <Route exact path="/admin">
                            <Redirect to={`${policiesPath}`} />
                        </Route>
                        <Route
                            path={policiesPath}
                            render={() => <PoliciesPage />}
                        />
                        <Route
                            path={usersPath}
                            render={() => <CreateUser />}
                        />
                    </Switch>
                </div>
            </BodyWrapper>
        </>
    );
};

export default AdminPage;