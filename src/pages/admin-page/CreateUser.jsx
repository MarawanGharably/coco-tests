import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Select from 'react-select';
import EmailInput from '../../components/validation-input/EmailInput';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Input from '../../components/input/Input';
import { apiAdminGetAllStorePolicies, apiAdminCreateUser } from '../../utils/apiUtils';


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
        <div className="flex flex-column flex-center full-width">
            <h2 className="title">Create User</h2>

            <div css={css`margin: 3em 0;`}>
                <Input
                    labelTitle="Name"
                    width="40em"
                    value={name}
                    handleChange={onNameChange}
                />
            </div>
            <div css={css`margin: 3em 0;`}>
                <EmailInput
                    width="40em"
                    value={email}
                    handleChange={onEmailInputChange}
                />
            </div>

            <Select
                className="select"
                isMulti
                placeholder="Select store policies"
                options={policies}
                onChange={(value) => onPoliciesSelected(value)}
            />

            <SubmitButton
                className="flex flex-vertical-center flex-grow"
                submitting={submitting}
                onClick={onRegisterClicked}
            />

            {error.length >= 1 && <p className="error">{error}</p>}

        </div>

    );
};


export default CreateUser;
