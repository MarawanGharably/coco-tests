import React from 'react';
import { Row } from 'react-bootstrap';
import Layout from '../Layout';
import SideBarMenu from '../_common/SideBarMenu';
import HeaderMenu from "../_common/HeaderMenu";


export default function AdminPageLayout({ title, meta={}, children }) {
    const links = [
        { label: 'Users', url: `/admin/users/`},
        { label: 'Stores', url: `/admin/stores/` },
    ];

    if(!meta?.title) meta.title = 'COCO: Admin';

    return (
        <Layout meta={meta} fluid={true} showNavBar={false}>
            <Row>
                <Layout.LeftSidebar>
                    <SideBarMenu links={links} />
                </Layout.LeftSidebar>

                <Layout.ContentArea>
                    <HeaderMenu/>
                    <h2>{title}</h2>
                    {children}
                </Layout.ContentArea>
            </Row>
        </Layout>
    );
}
