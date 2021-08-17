import React from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './headerMenu.module.scss';

export default function HeaderMenu() {
    const router = useRouter();

    const links = [
        { label: 'Stores', url: '/' },
        // { label: 'Asset Management', url: '/asset-management' },
        { label: 'Logout', url: '/auth/logout' },
    ];

    return (
        <Nav className={`${styles.headerMenu} justify-content-end`}>
            {links.map((item, i) => (
                <Link href={item.url} key={i}>
                    <a className={`nav-link ${router.pathname == item.url ? 'active' : ''}`}>{item.label}</a>
                </Link>
            ))}
        </Nav>
    );
}
