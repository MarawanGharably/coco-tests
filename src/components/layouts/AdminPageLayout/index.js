import React from 'react';
import { Row } from 'react-bootstrap';
import Layout from '../Layout';
import SideBarMenu from '../_common/SideBarMenu';
import HeaderMenu from "../_common/HeaderMenu";
import styles from './adminPageLayout.module.scss';

export default function AdminPageLayout({ title, meta={}, children }) {
    const links = [
        { label: 'Users', url: `/admin/users/` },
        { label: 'Stores', url: `/admin/stores/` },
    ];

    if(!meta?.title) meta.title = 'COCO: Admin';

    return (
        <Layout meta={meta} fluid="xl" showNavBar={false} className={styles.adminLayout}>
            <Row>
                <Layout.LeftSidebar>
                    <SideBarMenu links={links} />
                </Layout.LeftSidebar>

                <Layout.ContentArea>
                    <HeaderMenu/>
                    <h2 className={styles.title}>{title}</h2>
                    {children}
                </Layout.ContentArea>
            </Row>
        </Layout>
    );
}
