import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Field, reduxForm, getFormValues, FieldArray } from "redux-form";
import { Card, Alert, Form } from "react-bootstrap";
import { Input, Select } from '../../../components/ReduxForms/_formFields';
import { SubmitButton } from '../../../components/FormComponents';
import AdminPageLayout from '../../../components/layouts/AdminPageLayout';

//API Methods
import { createUser, getStores } from "../../../APImethods";
import { getClients } from "../../../APImethods/ClientsAPI";
import {  getLabelValuePair } from "../../../utils/helpers";
import PermissionsEditor from "../../../components/ReduxForms/_formFields/PermissionsEditor";

let NewUserForm = (props) => {
    const { handleSubmit, user } = props;

    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState();
    const router = useRouter();

    const [stores, setStores] = useState();
    const [clients, setClients] = useState([]);

    useEffect(() => {
        getStores(["id", "name", "client"]).then(response => {
            const options = response.map(item => {
                return ({
                    ...getLabelValuePair(item?.name, item["_id"]["$oid"]),
                    client: item["client"]["$oid"]
                });
            });
            setStores(options);
        });

        getClients(["id", "name"]).then(res => {
            setClients(res.map(item => getLabelValuePair(item.name, item["_id"]["$oid"])));
        });
    }, []);

    const onSubmit = (values) => {
        setSubmitting(true);
        console.log("=>", values);
        createUser(values)
        .then((res) => {
            setStatus({ type: "success", msg: "Success" });
            setTimeout(() => {
                router.push("/admin/users");
            }, 3000);
        })
        .catch((err) => {
            setStatus({ type: "error", msg: err?.error_message || "Error" });
        })
        .finally(() => {
            setSubmitting(false);
        });
    };

    return (
      <AdminPageLayout title="Create User">
          <form onSubmit={handleSubmit(onSubmit)}>
              {status?.type === "success" && <Alert variant="success">{status.msg}</Alert>}
              {status?.type === "error" && <Alert variant="danger">{status.msg}</Alert>}
              <Card className="my-4">
                  <Card.Header>General</Card.Header>
                  <Card.Body>
                      <Field name="given_name" label="User Name" component={Input} />
                      <Field name="email" label="Email" type="email" component={Input} />
                      <Form.Label>Client</Form.Label>
                      <Field name="client" label={"Client"} component={Select} isSearchable
                             options={clients} />
                  </Card.Body>
              </Card>

              <Card className="my-4">
                  <Card.Header>Permissions</Card.Header>
                  <Card.Body>
                      <FieldArray
                          name="permissions"
                          userPermissions={user?.permissions}
                          submitting={submitting}
                          component={PermissionsEditor}
                          clients={clients}
                          stores={stores}
                      />
                  </Card.Body>
              </Card>

              <SubmitButton
                buttonText="Create"
                submitting={submitting}
                className="float-right"
              />
          </form>
      </AdminPageLayout>
    );
};

const validate = (values) => {
    const errors = {};
    if (!values.given_name) errors.given_name = 'User Name cannot be empty';
    if (!values.email) errors.email = 'Email cannot be empty';
    return errors;
};

NewUserForm = reduxForm({
    form: 'NewUserForm',
    validate,
})(NewUserForm);

const mapStateToProps = (state) => ({
    formValues: getFormValues('NewUserForm')(state),
    user: state.user,
});

export default connect(mapStateToProps, {})(NewUserForm);
