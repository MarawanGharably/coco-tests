import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import PasswordInput from '../../components/validation-input/PasswordInput';
import SubmitButton from '../../components/submit-button/SubmitButton';
import { API_URL } from '../../utils/envVariables';
import { AuthAction, useAuth } from '../../auth/Auth';

const SET_PASSWORD_URL = `${API_URL}/auth/password`;

const CreatePasswordPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();
    const [, dispatch] = useAuth();

    useEffect(() => {
        // path is /password?a={email}&b={password}
        const urlParams = new URLSearchParams(window.location.search);
        const urlEmail = urlParams.get('a');
        const oldPassword = urlParams.get('b');
        setEmail(urlEmail);
        setPassword(oldPassword);
    }, []);

    const onNewPasswordInputChange = (e) => {
        e.persist();
        const { value } = e.target;
        setNewPassword(value);
    };

    const submitPassword = async () => {
        setSubmitting(true);
        setErrorMessage('');
        try {
            const response = await fetch(SET_PASSWORD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // need this for cookie to set
                body: JSON.stringify({
                    username: email,
                    oldPassword: password,
                    newPassword,
                }),
            });

            const statusCode = response.status;
            if (statusCode === 200) {
                dispatch({ type: AuthAction.LOGGED_IN });
                history.push('/profile');
            } else if (statusCode === 400) {
                console.error('Bad request'); // eslint-disable-line
                setErrorMessage('Invalid password, please input a valid password.');
                setSubmitting(false);
            } else if (statusCode === 403) {
                console.log('Already set password'); // eslint-disable-line
                history.push('/login');
            } else {
                console.error(response.statusText); // eslint-disable-line
                setErrorMessage('Server error, please try again later.');
                setSubmitting(false);
            }
        } catch (error) {
            console.error(error); // eslint-disable-line
            setSubmitting(false);
            setErrorMessage('Server error, please try again later.');
        }
    };

    const width = '50em';

    return (
        <Page
            pageTitle="Set Your Password"
            pageSubTitle="Let's make it official"
        >
            <PageRow width={width}>
                <PageItem>
                    <PasswordInput value={newPassword} handleChange={onNewPasswordInputChange} />
                </PageItem>
            </PageRow>
            <PageRow width={width}>
                <div>
                    <PageItem>
                        <SubmitButton
                            submitting={submitting}
                            onClick={submitPassword}
                        />
                    </PageItem>
                </div>
            </PageRow>
            <h1 style={{ textAlign: 'center' }}>
                {errorMessage}
            </h1>
        </Page>
    );
};

export default CreatePasswordPage;
