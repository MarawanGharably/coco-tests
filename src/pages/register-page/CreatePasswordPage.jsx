import React, { useEffect, useState } from 'react';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import PasswordInput from '../../components/validation-form/PasswordInput';
import FancyButton from '../../components/fancy-button/FancyButton';

const CreatePasswordPage = () => {
    const [email, setEmail] = useState(''); // eslint-disable-line

    useEffect(() => {
        // path is create.shopobsess.co/?setpassword={email}
        const urlParams = new URLSearchParams(window.location.search);
        const paramEmail = urlParams.get('setpassword');
        setEmail(paramEmail);
    }, []);

    const width = '40%';

    return (
        <Page
            pageTitle="Set Your Password"
            pageSubTitle="Let's make it official"
        >
            <PageRow width={width}>
                <PageItem
                    render={<PasswordInput />}
                />
            </PageRow>
            <PageRow width={width}>
                <div>
                    <PageItem
                        render={(
                            <FancyButton
                                text="SUBMIT"
                                buttonStyle={{ width: '10em', height: '4em' }}
                            />
                        )}
                    />
                </div>
            </PageRow>
        </Page>
    );
};

export default CreatePasswordPage;
