import React from "react";
import {NavLink} from "react-router-dom";
import { Row } from 'react-bootstrap';
import RecordsList from "../../../HOC/RecordsList";

//API Methods
import { getPolicies } from '../../../APImethods';

export default function UserGroupsList() {
    return (
        <>
            <h1>User Groups / Policies</h1>
            <Row className="justify-content-end">

                <NavLink to={`/admin/user-groups/create`} style={{ fontSize: '1em', fontWeight: '600' }}>
                    Create
                </NavLink>
            </Row>

            <RecordsList
                fetchRecordsFN={getPolicies}
                className="my-4"
                headers={['#', 'Store']}
                ItemComponent={UserGroupListItem}
            />
        </>
    );
}

const UserGroupListItem = ({ data, idx }) => {
    const _id= data._id.$oid;
    return (
        <tr>
            <td>{idx}</td>
            <td>{data.name}</td>
            {/*<td>*/}
                {/*<NavLink to={`/admin/user-groups/${_id}`}>*/}
                {/*    <i className="fas fa-pencil-alt"></i>*/}
                {/*</NavLink>*/}
            {/*</td>*/}
        </tr>
    );
};