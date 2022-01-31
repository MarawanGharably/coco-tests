import React, { useEffect, useState } from 'react';
import { Field, reduxForm, FieldArray } from "redux-form";
import { useRouter} from "next/router";
import { useSelector} from "react-redux";
import { Card, Button } from 'react-bootstrap';
import { Input} from '../../../components/ReduxForms/_formFields';
import AdminPageLayout from "../../../components/layouts/AdminPageLayout";
import SubmitButton  from '../../../components/ReduxForms/commonUI/SubmitButton';
import SubmitStatusMessage from "../../../components/ReduxForms/SubmitStatusMessage";
import {getStores, getUserDataWithId, updateUser, deleteUser} from "../../../APImethods";
import { getLabelValuePair } from "../../../utils/helpers";
import { getClients } from "../../../APImethods/ClientsAPI";
import PermissionsEditor from "../../../components/ReduxForms/_formFields/PermissionsEditor";
import ConfirmationDialog from '../../../components/ConfirmationDialog';


let UserForm = (props) => {
    const formData = useSelector(state => state.form.UserForm.values);
    const router = useRouter();
    const { id:userId } = router.query;
    const userName = formData?.given_name;

    const [submitting, setSubmitting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clients, setClients] = useState([]);
    const [stores, setStores] = useState();

    const [status, setStatus] = useState();
    const [deleteUserStatus, setDeleteUserStatus] = useState('initial');




    useEffect(() => {
        getClients(["id", "name"])
            .then(res => {
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


    const initializeStateFromResponse = (response) => {
        response.permissions = response.permissions.map(item => ({
            id:item._id,
            role: item.role,
            reference: item.reference,
            scope: item.scope
        }));
        const { given_name, permissions, UserStatus, client, email } = response;

        props.initialize({ given_name, permissions, UserStatus, client, email }); //Initialize form Data
    }


    useEffect(() => {
            //1. Fetch User Data
            userId && getUserDataWithId(userId)
                .then((res) => {
                    initializeStateFromResponse(res);
                });
    }, [userId]);


    const onSubmit = (values) => {
        setSubmitting(true);

        updateUser(userId, values)
            .then(res=>{
                //TODO: Use props.change('id', res._id); instead of initialize() method to update/create form id value
                initializeStateFromResponse(res);
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

    const onDelete = async () => {
         deleteUser(userId)
            .then(()=>{
                setDeleteUserStatus('deleted');
            }).catch(()=>{
                setDeleteUserStatus('error');
        })
    };





    return (<AdminPageLayout title='User'>
            <SubmitStatusMessage status={status} />

            <form onSubmit={props.handleSubmit(onSubmit)}>
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
                          component={PermissionsEditor}
                          clients={clients}
                          stores={stores}
                        />
                    </Card.Body>
                </Card>

                <SubmitButton buttonText="Update" submitting={submitting} className="float-right" />
                <Button 
                    className="delete-button"
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}>
                        <span className="text">Delete User</span>
                </Button>
            </form>

            <ConfirmationDialog
                show={showDeleteModal}
                title="Are you sure?"
                closeLabel="No"
                showCloseIcon={deleteUserStatus=='deleted' ? false : true}
                showFooter={deleteUserStatus=='deleted' ? false : true}
                onHide={e=>setShowDeleteModal(false)}
                onConfirm={onDelete}
            >
                <DialogContent mode={deleteUserStatus} userName={userName} router={router}/>
            </ConfirmationDialog>
        </AdminPageLayout>
    );
};


const DialogContent=({mode, userName, router})=>{
    const goToUsersList=()=>{
        router.push("/admin/users");
    }

    if(mode == 'error') return (<p>There has been an error deleting user ${userName}</p>);
    else if(mode == 'initial') return (<p>You want to delete user '{userName}'?</p>);
    else if(mode == 'deleted') return (<>
        <p>You have successfully deleted user '{userName}'?</p>
        <Button className="text-center" variant="primary" onClick={goToUsersList}>OK</Button>
    </>);
    else return false;
}


const validate = (values) => {
    const errors = {};
    if (!values.Username ) errors.Username = 'Username cannot be empty';
    // if (!values.email ) errors.email = 'Email cannot be empty';
    return errors;
};


export default reduxForm({
    form: "UserForm",
    validate
})(UserForm);

