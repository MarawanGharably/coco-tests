import React, { useState } from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import FancyButton from '../../components/fancy-button/FancyButton';
import EmailInput from '../../components/validation-input/EmailInput';
import PasswordInput from '../../components/validation-input/PasswordInput';

const LoginPage = () => {
    const [email, setEmail] = useState(''); // eslint-disable-line
    const [password, setPassword] = useState(''); // eslint-disable-line

    const handleLogIn = () => { // eslint-disable-line
        // TODO
    };

    const width = '50em';

    return (
        <Page
            pageTitle="Login"
            pageSubTitle="Welcome back"
        >
            <PageRow column width={width}>
                <PageItem render={<EmailInput />} />
                <PageItem render={<PasswordInput />} />
            </PageRow>
            <section className="login-page-helper-section flex">
                <div>
                    Don&apos;t have an account?
                    <a href="mailto:contact@shopobsess.co"> Send us an email</a>
                </div>
                <div className="forget-password">Don&apos;t have a password?</div>
            </section>
            <PageItem render={<FancyButton text="SUBMIT" buttonStyle={{ width: '10em', height: '4em' }} />} />
        </Page>
    );
};

export default LoginPage;
