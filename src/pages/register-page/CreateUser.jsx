import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import EmailInput from '../../components/validation-input/EmailInput';
import SubmitButton from '../../components/submit-button/SubmitButton';
import { Text } from '../../../stories/1-Button.stories';
import TextInput from '../../components/text-input/TextInput';
import Input from '../../components/input/Input';

const CREATE_USER_URL = 'http://127.0.0.1:5000/auth/create_user';

const CreateUser = () => {
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');


    const createUser = async (callback) => {
        await fetch(CREATE_USER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                given_name: name,
                username: userName,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                callback(result);
            }).catch((err) => setError(err));
    };

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


    const onRegisterClicked = () => {
        setSubmitting(true);
        createUser(onUserCreated);
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

            <p>{error}</p>
        </div>

    );
};

export default CreateUser;
