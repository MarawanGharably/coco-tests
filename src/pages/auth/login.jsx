import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LogInForm from '../../components/ReduxForms/Auth/LogInForm';
import Layout from '../../components/layouts/Layout';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default function LoginPage() {
    console.log('env', process.env);
    console.log('publicRuntimeConfig', publicRuntimeConfig);

    return (
        <Layout title="Login" subTitle="Welcome back">
            <Row className="justify-content-center mt-3">
                <Col xs={12} sm={10} md={7}>
                    <LogInForm />
                </Col>
            </Row>
        </Layout>
    );
}
