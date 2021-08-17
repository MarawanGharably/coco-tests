import React from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../_common/Header';
import config from '../../../config';
import styles from './Layout.module.scss';


export default function Layout({ title, subTitle, fluid = false, showHeader=true,  className = '', children }) {
    const router = useRouter();

    // Page Specific backgrounds
    const pageStyles = {};
    if (router.asPath == '/') pageStyles.background = `url(${config['CDN_HOST']}/ImageMaskgroup.png) no-repeat`;


    return (
        <div className={styles.layout} style={pageStyles}>
            <Head>
                <title>COCO</title>
            </Head>

            {showHeader && <Header />}

            <Container fluid={fluid} className={className}>
                {title && <h2 className="text-center">{title}</h2>}
                {subTitle && <h5 className="text-center">{subTitle}</h5>}
                {children}
            </Container>
        </div>)
}

