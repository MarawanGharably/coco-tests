import React from 'react';
import StoresList from './StoresList';
import StoreForm from './StoreForm';
import { Route, Switch } from 'react-router-dom';
import Layout from "../../../layouts/Layout";

export default function StoresPage() {
    return (<Layout>
            <Switch>
                <Route exact path={'/admin/stores'}>
                    <StoresList />
                </Route>
                {/*<Route path={`/admin/stores/create`}>*/}
                {/*<NewStoreForm mode="create" />*/}
                {/*</Route>*/}
                <Route path={`/admin/stores/:storeId`}>
                    <StoreForm />
                </Route>
            </Switch>
    </Layout>
    );
}
