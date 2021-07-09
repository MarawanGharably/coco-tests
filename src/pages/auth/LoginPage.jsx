import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LogInForm from '../../components/ReduxForms/Auth/LogInForm';
import Layout from '../../layouts/Layout';


export default function LoginPage() {
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
