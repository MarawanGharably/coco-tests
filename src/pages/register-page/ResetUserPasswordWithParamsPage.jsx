import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import PasswordInput from '../../components/validation-input/PasswordInput';
import SubmitButton from '../../components/submit-button/SubmitButton';
import { getUrlQueryParams } from '../../utils/urlHelper';

// Redux Actions
import { resetPassword } from '../../store/actions';

/*
* Reset user password page
* Users landing on this page via link format create.shopobsess.com/password?a=username&b=password
 */

const ResetUserPasswordWithParamsPage = () => {
    const query = getUrlQueryParams(window.location.href);
    const email = query.a;
    const password = query.b;

    const [newPassword, setNewPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const reduxDispatch = useDispatch();
    const history = useHistory();

    const onNewPasswordInputChange = e => {
        e.persist();
        const { value } = e.target;
        setNewPassword(value);
    };

    const submitPassword = async () => {
        setSubmitting(true);
        setErrorMessage('');
        reduxDispatch(resetPassword(email, password, newPassword))
            .then(res => {
				console.log('>>page resetPassword then', res);// eslint-disable-line
                const statusCode = res.status;
                if (statusCode === 200) {
                    // dispatch({ type: AuthAction.LOGGED_IN });
                    history.push('/');
                } else if (statusCode === 400) {
					console.error('Bad request'); // eslint-disable-line
                    setErrorMessage('Invalid password, please input a valid password.');
                    setSubmitting(false);
                } else if (statusCode === 403) {
					console.log('Already set password'); // eslint-disable-line
                    history.push('/login');
                } else {
					console.error(res.statusText); // eslint-disable-line
                    setErrorMessage('Server error, please try again later.');
                    setSubmitting(false);
                }
            })
            .catch(err => {
				console.error('Error', err); // eslint-disable-line
                setSubmitting(false);
                setErrorMessage('Server error, please try again later.');
            });
    };

    const width = '50em';

    return (
        <Page pageTitle="Set Your Password" pageSubTitle="Let's make it official">
            <PageRow width={width}>
                <PageItem>
                    <PasswordInput value={newPassword} handleChange={onNewPasswordInputChange} />
                </PageItem>
            </PageRow>
            <PageRow width={width}>
                <div>
                    <PageItem>
                        <SubmitButton submitting={submitting} onClick={submitPassword} />
                    </PageItem>
                </div>
            </PageRow>
            <h1 style={{ textAlign: 'center' }}>{errorMessage}</h1>
        </Page>
    );
};

export default ResetUserPasswordWithParamsPage;
