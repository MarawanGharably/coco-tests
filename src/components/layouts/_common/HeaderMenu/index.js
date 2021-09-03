import React from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './headerMenu.module.scss';
import { useSelector } from "react-redux";
import { userCanAccessAdminPanel } from "../../../../utils/permissions";

export default function HeaderMenu() {
    const router = useRouter();
    const user = useSelector((state) => state['user']);

    const links = [
        { label: 'Stores', url: '/' },
        { label: 'Logout', url: '/auth/logout' },
    ];

    if (userCanAccessAdminPanel(user?.permissions)) {
        links.splice(links.length - 1, 0, { label: 'Manage', url: '/admin/users/' }, )
    }

    return (
        <Nav className={`${styles.headerMenu} justify-content-end`}>
            {links.map((item, i) => (
                <Link href={item.url} key={i}>
                    <a className={`nav-link ${router.pathname.startsWith() === item.url ? 'active' : ''}`}>{item.label}</a>
                </Link>
            ))}
        </Nav>
    );
}



