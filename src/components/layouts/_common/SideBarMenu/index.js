import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './sideBarMenu.module.scss';

export default function SideBarMenu ({ links=[] }){
    const router = useRouter();
    return (
        <ul className={styles.cmp}>
            {links?.map((item, i) => {
                let isParentActive = item.url === router.asPath ;
                let isChildActive = item?.children?.some((item) => router.asPath == item.url);

                return (
                    <MenuItem
                        key={i}
                        isActive={isParentActive && !isChildActive}
                        label={item.label}
                        url={item.children?.[0]?.url || item.url}
                    >
                        { item.children && <SubMenu visible={isParentActive || isChildActive }  isParentActive={isParentActive} children={item.children} />}
                    </MenuItem>
                );
            })}
        </ul>
    );
};


const SubMenu = ({ isParentActive, visible, children }) => {
    let router = useRouter();

    return (
        <ul className={`${styles.subMenu} ${visible ? 'd-block' : 'd-none'} `}>
            {children?.map((item, idx) => {
                return <MenuItem
                    key={idx}
                    isActive={router.asPath == item.url && !isParentActive}
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






