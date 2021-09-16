import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './sideBarMenu.module.scss';

export default function SideBarMenu({ links }) {
    const router = useRouter();

    return (
        <ul className={styles.cmp}>
            {links?.map((item, i) => {
                const isActive = !!(router.asPath == item.url);
                return (
                    <li key={i} className={isActive ? styles.liActive : ''}>
                        <Link href={item.url}>
                            <a className={`${styles.link} ${isActive ? styles.active : ''}`}>{item.label}</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
