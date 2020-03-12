import React, { useEffect, useState } from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import PasswordInput from '../../components/validation-input/PasswordInput';
import FancyButton from '../../components/fancy-button/FancyButton';
import { useFormDataStore } from '../../data-store/form-data-store/FormDataStore';
import SpinLoader from '../../components/spin-loader/SpinLoader';
import { useHistory } from 'react-router-dom';

const SET_PASSWORD_URL = 'http://localhost/store/auth/password';

const CreatePasswordPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [state] = useFormDataStore();
    const history = useHistory();

    useEffect(() => {
        // path is /password?a={email}&b={password}
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('a');
        const password = urlParams.get('b');
        setEmail(email);
        setPassword(password);
    }, []);

    const submitPassword = async () => {
        setSubmitting(true);
        setErrorMessage('');
        try {
            const newPassword = state.password;
            const response = await fetch(SET_PASSWORD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // need this for cookie to set
                body: JSON.stringify({
                    username: email,
                    oldPassword: password,
                    newPassword: newPassword
                })
            });

            const statusCode = response.status;
            if (statusCode === 200) {
                history.push('/profile');
            } else if (statusCode === 400) {
                console.error('Bad request');
                setErrorMessage('Invalid password, please input a valid password.');
                setSubmitting(false);
            } else if (statusCode === 403) {
                console.log('Already set password');
                history.push('/login');
            } else {
                console.error(response.statusText);
                setErrorMessage('Server error, please try again later.')
                setSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            setErrorMessage('Server error, please try again later.');
        }
    }

    const width = '50em';

    return (
        <Page
            pageTitle="Set Your Password"
            pageSubTitle="Let's make it official"
        >
            <PageRow width={width}>
                <PageItem>
                    <PasswordInput />
                </PageItem>
            </PageRow>
            <PageRow width={width}>
                <div>
                    <PageItem>
                        {
                            submitting ? (
                                <SpinLoader
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderWidth: '5px',
                                        borderTopWidth: '5px'
                                    }}
                                />
                            ) : (
                                <FancyButton
                                    text="SUBMIT"
                                    buttonStyle={{ width: '10em', height: '4em' }}
                                    onClick={submitPassword}
                                />
                            )
                        }
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
