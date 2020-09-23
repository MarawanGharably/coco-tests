import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import EmailInput from '../../components/validation-input/EmailInput';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Input from '../../components/input/Input';
import { apiGetAllCMSStores, createUser } from '../../utils/apiUtils';


const CreateUser = () => {
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    const onNameChange = (e) => {
        e.persist();
        const { value } = e.target;
        setName(value);
    };

    const onUserNameChange = (e) => {
        e.persist();
        const { value } = e.target;
        setUserName(value);
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

        createUser({
            email,
            given_name: name,
            username: userName,
        })
            .then((result) => {
                onUserCreated(result);
            })
            .catch((err) => onUserCreateFailed(err));
    };

    return (
        <div className="flex flex-column flex-center full-width">
            <Link to="/">Home</Link>
            <h2>Create User</h2>

            <div css={css`margin: 3em 0;`}>
                <Input
                    labelTitle="Name"
                    width="40em"
                    value={name}
                    handleChange={onNameChange}
                />
            </div>
            <div css={css`margin: 3em 0;`}>
                <Input
                    labelTitle="Username"
                    width="40em"
                    value={userName}
                    handleChange={onUserNameChange}
                />
            </div>
            <div css={css`margin: 3em 0;`}>
                <EmailInput
                    width="40em"
                    value={email}
                    handleChange={onEmailInputChange}
                />
            </div>

            <SubmitButton
                submitting={submitting}
                onClick={onRegisterClicked}
            />

            {error.length >= 1 && <p>{error}</p>}
        </div>

    );
};

export default CreateUser;
