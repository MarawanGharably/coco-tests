import React from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../Header';
import config from '../../../config';
import styles from './Layout.module.scss';


export default function Layout({ title, subTitle, fluid = false, className = '', children }) {
    const router = useRouter();
    // console.log('>router', router);
    // Page Specific backgrounds
    const pageStyles = {};

    if (router.asPath == '/') pageStyles.background = `url(${config['CDN_HOST']}/ImageMaskgroup.png) no-repeat`;

    return (
        <div className={styles.layout} style={pageStyles}>
            <Head>
                <title>COCO</title>
            </Head>
            <Header />

            <Container fluid={fluid} className={`${styles.pageContainer} ${className}`}>
                {title && <h2 className="text-center">{title}</h2>}
                {subTitle && <h5 className="text-center">{subTitle}</h5>}

                {children}
            </Container>
        </div>)
}

