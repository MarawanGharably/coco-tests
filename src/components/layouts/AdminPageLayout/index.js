import { Col, Row } from 'react-bootstrap';
import Layout from "../Layout";
import NavBar from "../../NavBar";
import React from "react";
import styles from './adminPageLayout.module.scss';


//TODO: refactor to use <Layout.LeftSidebar >, <Layout.ContentArea> and <SideBarMenu/>

export default function AdminPageLayout({title, children}){
    return(<Layout fluid='xl' className={styles.adminLayout}>
        <Row>
            <Col xs={4} sm={3}>
                <NavBar>
                    <NavBar.Item name="USERS" pathName={`/admin/users`} />
                    <NavBar.Item name="STORES" pathName={`/admin/stores`} />
                </NavBar>
            </Col>
            <Col xs={8} sm={9}>
                <h2 className={styles.title}>{title}</h2>
                {children}
            </Col>
        </Row>
    </Layout>)
}
