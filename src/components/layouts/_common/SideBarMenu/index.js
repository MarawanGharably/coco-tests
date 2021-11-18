import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './sideBarMenu.module.scss';

export default function SideBarMenu ({ links }){
    const router = useRouter();
    return (
        <ul className={styles.cmp}>
            {links?.map((item, i) => {
                let isActive = item?.children?.some((item) => router.asPath == item.url);

                return (
                    <MenuItem
                        key={i}
                        isActive={isActive}
                        label={item.label}
                        url={item.children?.[0].url || item.url}
                    >
                        {item.children && <SubMenu isActive={isActive} children={item.children} />}
                    </MenuItem>
                );
            })}
        </ul>
    );
};


const SubMenu = ({ isActive, children }) => {
    let router = useRouter();
    return (
        <ul className={`${styles.subMenu} ${isActive ? styles.active : ''} `}>
            {children?.map((item, idx) => {
                return <MenuItem
                    key={idx}
                    isActive={router.asPath == item.url}
                    label={item.label}
                    url={item.url}
                />;
            })}
        </ul>
    );
};

const MenuItem = ({ isActive, url='', label='', children }) => (
    <li className={isActive ? styles.active : ''}>
        <Link href={url}>
            <a>{label}</a>
        </Link>
        {children}
    </li>
);






