import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.scss';

const OBSESS_LOGO_URL = 'https://cdn.obsessvr.com/coco/coco-header-logo-blue.png';

export default function Logo({className=''}) {
    return (<div id='logo' className={styles.cmp}>
            <Link href="/">
                <a className={`navbar-brand ${className}`}>
                    <img  alt="obsess logo" src={OBSESS_LOGO_URL} />
                </a>
            </Link>
    </div>);
}
