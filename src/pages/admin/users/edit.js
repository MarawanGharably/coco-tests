import React, { useEffect, useState } from 'react';
import { Field, reduxForm, FieldArray } from "redux-form";
import { useRouter} from "next/router";
import { Card } from 'react-bootstrap';
import { Input} from '../../../components/ReduxForms/_formFields';
import AdminPageLayout from "../../../components/layouts/AdminPageLayout";
import {SubmitButton} from "../../../components/FormComponents";
import SubmitStatusMessage from "../../../components/ReduxForms/SubmitStatusMessage";

//API methods
import {
    getStores,
    getUserDataWithId, updateUser
} from "../../../APImethods";
import { connect } from "react-redux";
import {  getLabelValuePair } from "../../../utils/helpers";
import { getClients } from "../../../APImethods/ClientsAPI";
import PermissionsEditor from "../../../components/ReduxForms/_formFields/PermissionsEditor";

//TODO: remove formatUserDataToSubmit, formatPermissions

let UserForm = (props) => {
    const router = useRouter();
    const { id:userId } = router.query;

    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState();

    const [clients, setClients] = useState([]);
    const [stores, setStores] = useState();

    useEffect(() => {
        getClients(["id", "name"]).then(res => {
            setClients(res.map(item => getLabelValuePair(item.name, item["_id"]["$oid"])));
        });

        getStores(["id", "name", "client"]).then(response => {
            const options = response.map(item => {
                return ({
                    ...getLabelValuePair(item?.name, item["_id"]["$oid"]),
                    client: item["client"]["$oid"]
                });
            });
            setStores(options);
        });
    }, []);

    useEffect(() => {
        if(userId){
            //1. Fetch User Data
            getUserDataWithId(userId).then((res) => {
                res.permissions = res.permissions.map(item => {
                    return {
                        id:item._id,
                        role: item.role,
                        reference: item.reference,
                        scope: item.scope
                    };
                });
                const { given_name, permissions, UserStatus, client, email } = res;

                props.initialize({ given_name, permissions, UserStatus, client, email }); //Initialize form Data
            });


        }
    }, [userId]);

    const onSubmit = (values) => {
        setSubmitting(true);

        updateUser(userId, values)
            .then(res=>{
                setStatus({ success: true, message: 'Updated Successfully' });
            }).catch(err=>{
            setStatus({ error: true, message: err?.message || 'Error' });
        }).finally(()=>{
            setSubmitting(false);
            setTimeout(() => {
                setStatus(false);
            }, 5000);
        });
    };


    return (<AdminPageLayout title='User'>
            <form onSubmit={props.handleSubmit(onSubmit)}>

                <SubmitStatusMessage status={status} />

                <Card className="my-4">
                    <Card.Header>General</Card.Header>
                    <Card.Body>
                        <Field name="given_name" label="User Name" component={Input} disabled />
                        <Field name="email" label="email" type="email" component={Input} disabled />
                        <Field name="UserStatus" label="UserStatus" component={Input} disabled />
                    </Card.Body>
                </Card>

                <Card className="my-4">

                <Card.Header>Permissions</Card.Header>
                    <Card.Body>
                        <FieldArray
                          name="permissions"
                          userPermissions={props.user?.permissions}
                          component={PermissionsEditor}
                          clients={clients}
                          stores={stores}
                        />
                    </Card.Body>
                </Card>

                <SubmitButton buttonText="Update" submitting={submitting} className="float-right" />
            </form>
        </AdminPageLayout>
    );
};

const validate = (values) => {
    const errors = {};
    if (!values.Username ) errors.Username = 'Username cannot be empty';
    // if (!values.email ) errors.email = 'Email cannot be empty';
    return errors;
};


UserForm = reduxForm({
    form: "UserForm",
    validate
})(UserForm);

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, {})(UserForm);
