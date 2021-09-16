import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RequestVerificationCodeForm from '../../components/ReduxForms/Auth/ResetUserPasswordForm/RequestVerificationCodeForm';
import ResetPasswordForm from '../../components/ReduxForms/Auth/ResetUserPasswordForm/ResetPasswordForm';
import Layout from '../../components/layouts/Layout';

export default function ResetUserPasswordPage() {
    const router = useRouter();
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
            router.push('/auth/login');
        }, 10000);
    };

    return (
        <Layout title="Account recovery">
            <Row className="justify-content-center mt-4">
                <Col xs={11} sm={6}>

                    {/* Step #1 - verify Email */}
                    {mode === 'VERIFY_USER_EMAIL' && <RequestVerificationCodeForm
                        onSuccessSubmitCallback={onEmailSubmitted}
                    />}

                    {/* Step #2 - verify Code */}
                    {mode === 'CODE_VERIFICATION' && (
                        <ResetPasswordForm
                            email={email}
                            verificationCodeStatus={verificationCodeStatus}
                            onSuccessSubmitCallback={onNewPasswordCreated}
                        />
                    )}

                    {/* Step #3 - Success */}
                    {mode === 'COMPLETED' && (
                        <Row className='justify-content-center'>
                            <h2>Your password was successfully updated</h2>

                            <p className='my-2' style={{ fontSize: '1em', textAlign: 'center' }}>
                                <Link href="/login">
                                    <a>Log In</a>
                                </Link>{'  '} using new credentials
                            </p>

                            <p className='my-2'>You will be automatically redirected after 10 seconds</p>
                        </Row>
                    )}
                </Col>
            </Row>
        </Layout>
    );
}
