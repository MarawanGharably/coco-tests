import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './storeMenu.module.scss';

export default function StoreMenu(props) {
    const router = useRouter();
    const { id: storeId } = router.query;
    const storeBasePath = `/store`;

    const links = [
        { label: 'General', url: `${storeBasePath}/?id=${storeId}` },
        // {label:'Welcome Screen', url:`${storeBasePath}/welcome`  },
        // {label:'Product Pop Up', url:`${storeBasePath}/popup` },
        // {label:'Section Selector', url: `${storeBasePath}/selectors` },
        // {label:'Icons', url:'/icons'},
        { label: 'Hotspots', url: `${storeBasePath}/hotspots/?id=${storeId}` },
        // {label:'Navigation Arrows', url:'/'},
        // {label:'Product Data', url:'/'},
    ];

    return (
        <ul className={styles.storeMenu}>
            {links.map((item, i) => {
                const isActive = !!(router.asPath == item.url);
                return (
                    <li key={i} className={isActive ? styles.liActive:false }>
                        <Link href={item.url}>
                            <a className={`${styles.link} ${isActive ? styles.active : ''}`}>{item.label}</a>
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}
