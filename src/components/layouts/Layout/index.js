import React from 'react';
import { Container } from 'react-bootstrap';
import Head from 'next/head';
import Header from '../Header';
// import styles from './Layout.module.scss';

export default function Layout({ title, subTitle, fluid = false, className = '', children }) {
    return (
        <>
            <Head>
                <title>COCO</title>
            </Head>
            <Header />
            <Container fluid={fluid} className={className}>
                {title && <h2 className="text-center">{title}</h2>}
                {subTitle && <h5 className="text-secondary text-center">{subTitle}</h5>}

                {children}
            </Container>
        </>
    );
}
