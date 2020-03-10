import React, { useEffect, useState } from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import PasswordInput from '../../components/validation-input/PasswordInput';
import FancyButton from '../../components/fancy-button/FancyButton';

const CreatePasswordPage = () => {
    useEffect(() => {
        // path is create.shopobsess.co/?setpassword={email}
        // path is /password?a={email}&b={password}
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('a');
        const password = urlParams.get('b');
        console.log(email, password);
        // const paramEmail = urlParams.get('setpassword');
    }, []);

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
                        <FancyButton
                            text="SUBMIT"
                            buttonStyle={{ width: '10em', height: '4em' }}
                        />
                    </PageItem>
                </div>
            </PageRow>
        </Page>
    );
};

export default CreatePasswordPage;
