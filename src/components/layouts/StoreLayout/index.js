import React from 'react';
import Head from 'next/head';
import { Container, Col, Row } from 'react-bootstrap';
import Logo from '../_common/Logo';
import StoreMenu from './StoreMenu';
import HeaderMenu from '../_common/HeaderMenu';
import styles from './storeLayout.module.scss';

export default function StoreLayout({ title, subTitle, meta, className = '', children }) {
    return (
        <Container fluid={true} className={`${styles.cmp} ${className}`}>
            <Head>
                <title>{meta?.title || 'COCO: Store Editing'}</title>
            </Head>

            <Row className={styles.row}>
                <Col xs={4} sm={3} lg={3} xl={2} className={styles.storeSidebar}>
                    <Logo className={styles.logo} />
                    <StoreMenu />
                </Col>

                <Col xs={8} sm={9} lg={9} xl={10}>
                    {/*Content Wrapper */}
                    <div className={styles.content}>
                        <HeaderMenu />
                        {title && (<h1 className={styles.title}>{title}</h1>)}
                        {subTitle && <h6 className={styles.subTitle}>{subTitle}</h6>}
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
