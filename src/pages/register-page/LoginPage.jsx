import React from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import FancyButton from '../../components/fancy-button/FancyButton';
import EmailInput from '../../components/validation-input/EmailInput';
import PasswordInput from '../../components/validation-input/PasswordInput';
import { useFormDataStore } from '../../data-store/form-data-store/FormDataStore';
import { API_URL } from '../../utils/envVariables';
import { AuthAction, useAuth } from '../../auth/Auth';

const LOGIN_URL = `${API_URL}/auth/login`;

const LoginPage = () => {
    const [state,] = useFormDataStore();
    const history = useHistory();
    const [_, dispatch] = useAuth();

    const login = async () => {
        const email = state.email;
        const password = state.password;

        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // need this for cookie to set
            body: JSON.stringify({
                username: email,
                password: password,
            })
        });

        const statusCode = response.status;
        if (statusCode === 200) {
            const responseJson = await response.json();
            console.log(responseJson);
            dispatch({ type: AuthAction.LOGGED_IN });
            history.push('/');
        } else if (statusCode === 400) {
            console.error('Bad request');
        } else {
            console.error(response.statusText);
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
                    <EmailInput />
                </PageItem>
                <PageItem>
                    <PasswordInput />
                </PageItem>
            </PageRow>
            <section className="login-page-helper-section flex">
                <div>
                    Don&apos;t have an account?
                    <a href="mailto:contact@shopobsess.co"> Send us an email</a>
                </div>
                <div className="forget-password">Don&apos;t have a password?</div>
            </section>
            <PageItem>
                <FancyButton
                    text="SUBMIT"
                    buttonStyle={{ width: '10em', height: '4em' }}
                    onClick={login}
                />
            </PageItem>
        </Page>
    );
};

export default LoginPage;
