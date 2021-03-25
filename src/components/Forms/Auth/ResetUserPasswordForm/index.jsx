import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageRow from '../../../page-row/PageRow';
import RequestVerificationCodeForm from './RequestVerificationCodeForm';
import ResetPasswordForm from './ResetPasswordForm';

const ResetUserPasswordForm = () => {
    const history = useHistory();
    const [mode, setMode] = useState('VERIFY_USER_EMAIL');
    const [email, setEmail] = useState(false);
    const [verificationCodeStatus, setVerificationCodeStatus] = useState(false);

    // Step 1: Verify Email
    const onEmailSubmitted = (emailInput, data) => {
        if (data.status && data.status === 'success') {
            setMode('CODE_VERIFICATION');
            setEmail(emailInput);
            setVerificationCodeStatus(data);
        }
    };

    // Step 2: Confirm Verification Code, set New Passw
    const onNewPasswordCreated = () => {
        setMode('COMPLETED');
        setTimeout(() => {
            history.push('/login');
        }, 10000);
    };

    return (
        <>
            {/* Step #1 - verify Email */}
            {mode === 'VERIFY_USER_EMAIL' && <RequestVerificationCodeForm onSuccessSubmitCallback={onEmailSubmitted} />}

            {/* Step #2 - verify Code */}
            {mode === 'CODE_VERIFICATION' && <ResetPasswordForm email={email} verificationCodeStatus={verificationCodeStatus} onSuccessSubmitCallback={onNewPasswordCreated} />}

            {/* Step #3 - Success */}
            {mode === 'COMPLETED' && (
                <>
                    <PageRow width="100%">
                        <h1>Your password was successfully updated</h1>
                    </PageRow>

                    <PageRow width="100%">
                        <p style={{ fontSize: '2em', textAlign: 'center' }}>
                            <a href="/login">Log In</a>
                            {' '}
                            using new password
                        </p>
                    </PageRow>

                    <PageRow width="100%">
                        <p>You will be automatically redirected after 10 seconds</p>
                    </PageRow>
                </>
            )}
        </>
    );
};

export default ResetUserPasswordForm;
