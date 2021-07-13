import React from "react";
import {NavLink} from "react-router-dom";
import RecordsList from "../../../HOC/RecordsList";
import { getUserStores } from "../../../APImethods";
import Layout from "../../../layouts/Layout";

export default function StoresList() {
    return (
        <Layout title='Stores'>
            <RecordsList
                fetchRecordsFN={getUserStores}
                className="my-4"
                headers={['#', 'Name', 'status', '']}
                ItemComponent={StoresListItem}
            />
        </Layout>
    );
}

const StoresListItem = ({ data, idx }) => {
    const storeId = data._id.$oid;
    return (
        <tr>
            <td>{idx}</td>
            <td>{data.name }</td>
            <td>{data.status}</td>
            <td>
                <NavLink to={`/admin/stores/${storeId}`}>
                    <i className="fas fa-pencil-alt"></i>
                </NavLink>
            </td>
        </tr>
    );
};