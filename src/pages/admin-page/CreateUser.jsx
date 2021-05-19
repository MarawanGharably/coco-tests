import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import EmailInput from '../../components/validation-input/EmailInput';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Input from '../../components/input/Input';
import { apiAdminGetAllStorePolicies, apiAdminCreateUser } from '../../utils/apiUtils';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';

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

    return (

        <Page
            pageTitle="Create User"
            pageSubTitle="Create User and Add Stores"
        >
            <PageRow width="35em">
                <PageItem>
                    <Input
                        labelTitle="Name"
                        value={name}
                        handleChange={onNameChange}
                    />
                </PageItem>
            </PageRow>
            <PageRow width="35em">
                <PageItem>
                    <EmailInput
                        value={email}
                        handleChange={onEmailInputChange}
                    />
                </PageItem>
            </PageRow>
            <PageRow width="auto">
                <PageItem>
                    <Select
                        className="select"
                        isMulti
                        placeholder="Select Store Policies"
                        options={policies}
                        onChange={(value) => onPoliciesSelected(value)}
                    />
                </PageItem>
            </PageRow>
            {error.length > 0 && (
                <PageRow width="auto">
                    <PageItem>
                        <div className="error">{error}</div>
                    </PageItem>
                </PageRow>
            )}
            <PageRow width="auto">
                <SubmitButton
                    buttonText="CREATE"
                    className="flex flex-vertical-center flex-grow"
                    submitting={submitting}
                    onClick={onRegisterClicked}
                />
            </PageRow>
        </Page>
    );
};


export default CreateUser;
