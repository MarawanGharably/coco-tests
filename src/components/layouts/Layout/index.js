import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../_common/Header';
import Logo from "../_common/Logo";
import config from '../../../config';
import styles from './Layout.module.scss';


export default function Layout({ title, subTitle, fluid = false, showNavBar=true,  className = '', meta, children }) {
    const router = useRouter();

    // Page backgrounds
    const pageStyles = {};
    if (router.asPath === '/') pageStyles.background = `url(${config['CDN_HOST']}/ImageMaskgroup.png) no-repeat`;


    return (
        <div className={`${styles.cmp} ${className}`} style={pageStyles}>
            <Head>
                <title>{meta?.title || 'COCO'}</title>
            </Head>

            {/* Default NavBar placement */}
            {showNavBar && <Header />}

            <Container fluid={fluid}  >
                {title && <h2 className="text-center">{title}</h2>}
                {subTitle && <h5 className="text-center">{subTitle}</h5>}

                {children}

            </Container>
        </div>)
}

Layout.LeftSidebar=({xs=4, sm=3, lg=3, xl=2, children})=>{
    return(<Col xs={xs} sm={sm} lg={lg} xl={xl} className={styles.leftSideBar}>
        <Logo className={styles.logo} />
        {children}
    </Col>)
}

Layout.ContentArea=({xs=8, sm=9, lg=9, xl=10, children})=>{
    return(<Col xs={xs} sm={sm} lg={lg} xl={xl} className={styles.contentArea}>
        <div>{children}</div>
    </Col>)
}


