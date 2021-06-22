import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import {SubmitButton, Input, EmailInput} from '../../components/FormComponents';
import { apiAdminGetAllStorePolicies, apiAdminCreateUser } from '../../utils/apiUtils';
import Layout from "../../layouts/Layout";

const CreateUser = () => {
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [policies, setPolicies] = useState([]);
    const [selectedPolicies, setSelectedPolicies] = useState([]);

    const getPolicies = () => {
        apiAdminGetAllStorePolicies()
            .then((response) => {
                setPolicies(response.map((option) => ({
                    ...option,
                    label: option.name,
                    value: option.access_policy,
                })));
            })
            .catch((err) => setError(err));
    };

    useEffect(() => {
        getPolicies();
    }, []);

    const onNameChange = (e) => {
        e.persist();
        const { value } = e.target;
        setName(value);
    };

    const onEmailInputChange = (e) => {
        e.persist();
        const { value } = e.target;
        setEmail(value);
    };

    const onUserCreated = () => {
        setSubmitting(false);
    };

    const onUserCreateFailed = (err) => {
        setSubmitting(false);
        setError(err);
    };

    const onRegisterClicked = () => {
        setSubmitting(true);
        apiAdminCreateUser({
            email,
            given_name: name,
            policies: selectedPolicies,
        })
            .then((result) => {
                onUserCreated(result);
            })
            .catch((err) => onUserCreateFailed(err));
    };

    const onPoliciesSelected = (values) => {
        setSelectedPolicies(values.map((item) => item.value));
    };

    return (<Layout title="Create User" subTitle="Create User and Add Stores">
        <Row className='justify-content-center mt-4' >
            <Col xs={11} lg={6} >
                <Row className='flex-column mt-4' >
                    <Input
                        labelTitle="Name"
                        value={name}
                        handleChange={onNameChange}
                    />
                </Row>
                <Row className='flex-column mt-4'>
                    <EmailInput value={email} handleChange={onEmailInputChange} />
                </Row>
                <Row width="auto" className='justify-content-center mt-4'>
                    <Select
                        className="select"
                        isMulti
                        placeholder="Select Store Policies"
                        options={policies}
                        onChange={(value) => onPoliciesSelected(value)}
                    />
                </Row>
                {error.length > 0 && (
                    <Row className='justify-content-center mt-4' >
                        <div className="error">{error}</div>
                    </Row>
                )}
                <Row className='justify-content-center mt-4'>
                    <SubmitButton
                        buttonText="CREATE"
                        className="flex flex-vertical-center flex-grow"
                        submitting={submitting}
                        onClick={onRegisterClicked}
                    />
                </Row>
            </Col>
        </Row>
        </Layout>
    );
};


export default CreateUser;
