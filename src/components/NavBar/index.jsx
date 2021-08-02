import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './NavBar.module.scss';

const NavBar = ({ children }) => (
    <nav className={`${styles['nav-bar']} d-flex`}>
        <ul className={styles['nav-bar-container']}>
            {children}
        </ul>
    </nav>
);

NavBar.Item=({ pathName, name, child, children })=>{
    const router  = useRouter();
    const isActive = router.asPath == pathName;

    return(<>
        <li className={child ? styles['nav-bar-item-child'] : styles['nav-bar-item']}>
            <div className={styles['nav-bar-link-container']}>
                <Link href={pathName}  >
                    <a className={`${styles['nav-bar-link']} ${isActive ? styles['selected']:''}`}>{name}</a>
                </Link>
            </div>
            {children && (
                <ul className={`${styles['childrenList']} ${isActive ? styles['show'] :''}`}>
                    {children}
                </ul>
            )}
        </li>
        {!child && <hr className={styles['section-break']} />}
    </>)

}


NavBar.propTypes = {
    children: PropTypes.element,
};

NavBar.defaultProps = {
    children: null,
};

export default NavBar;
