import React from "react";
import Layout from '../../../layouts/Layout';
import {Route, Switch} from "react-router-dom";


export default function StoresPage(){
    return(<Layout>
        <Switch>
            <Route exact path={'/admin/stores'}>
                {/*<StoressList />*/}
            </Route>
            <Route path={`/admin/stores/create`}>
                {/*<NewStoreForm mode="create" />*/}
            </Route>
            <Route path={`/admin/stores/:storeId`}>
                {/*<Form />*/}
            </Route>
        </Switch>
    </Layout>)
}