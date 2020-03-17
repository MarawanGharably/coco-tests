import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import SubmitButton from '../../components/submit-button/SubmitButton';
import EmailInput from '../../components/validation-input/EmailInput';
import PasswordInput from '../../components/validation-input/PasswordInput';
import { API_URL } from '../../utils/envVariables';
import { AuthAction, useAuth } from '../../auth/Auth';

const LOGIN_URL = `${API_URL}/auth/login`;

const LoginPage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const [, authDispatch] = useAuth();

    const onEmailInputChange = (e) => {
        e.persist();
        const { value } = e.target;
        setEmail(value);
    };

    const onPasswordInputChange = (e) => {
        e.persist();
        const { value } = e.target;
        setPassword(value);
    };

    const login = async () => {
        setSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // need this for cookie to set
                body: JSON.stringify({
                    username: email,
                    password,
                }),
            });

            const statusCode = response.status;
            if (statusCode === 200) {
                authDispatch({ type: AuthAction.LOGGED_IN });
                history.push('/');
            } else if (statusCode === 400) {
                console.error('Bad request'); // eslint-disable-line
                setSubmitting(false);
                setErrorMessage('Invalid input, please try again.');
            } else if (statusCode === 401) {
                console.error('Invalid credentials'); // eslint-disable-line
                setSubmitting(false);
                setErrorMessage('Invalid credentials, please try again.');
            } else {
                throw new Error(response.statusText);
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
            pageTitle="Login"
            pageSubTitle="Welcome back"
        >
            <PageRow column width={width}>
                <PageItem>
                    <EmailInput value={email} handleChange={onEmailInputChange} />
                </PageItem>
                <PageItem>
                    <PasswordInput value={password} handleChange={onPasswordInputChange} />
                </PageItem>
            </PageRow>
            <section className="login-page-helper-section flex">
                <div>
                    Don&apos;t have an account?
                    <a href="mailto:contact@shopobsess.co"> Send us an email</a>
                </div>
                <div className="forget-password">Don&apos;t have a password?</div>
            </section>
            <SubmitButton
                submitting={submitting}
                onClick={login}
            />
            <h1 style={{ textAlign: 'center' }}>
                {errorMessage}
            </h1>
        </Page>
    );
};

export default LoginPage;
