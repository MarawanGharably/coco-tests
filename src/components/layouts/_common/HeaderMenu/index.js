import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { userCanAccessAdminPanel } from '../../../../utils/permissions';
import styles from './headerMenu.module.scss';

export default function HeaderMenu() {
    const router = useRouter();
    const user = useSelector((state) => state['user']);
    const [mounted, setMounted] = useState();
    const [links, setLinks] = useState([
        { label: 'Stores', url: '/' },
        { label: 'Logout', url: '/auth/logout' },
    ]);

    useEffect(() => {
        if (!mounted) setMounted(true);

        if (userCanAccessAdminPanel(user?.permissions)) {
            links.splice(links.length - 1, 0, { label: 'Manage', url: '/admin/users/' });
            setLinks(links);
        }
    }, []);

    return (
        <Nav className={`${styles.headerMenu} justify-content-end`}>
            {mounted && links.map((item, i) => (
                    <Link href={item.url} key={i}>
                        <a className={`nav-link ${router.pathname.startsWith() === item.url ? 'active' : ''}`}>{item.label}</a>
                    </Link>
                ))}
        </Nav>
    );
}
