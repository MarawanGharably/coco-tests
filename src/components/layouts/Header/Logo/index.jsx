import React from 'react';
import styles from './Logo.module.scss';

const OBSESS_LOGO_URL = 'https://cdn.obsessvr.com/coco/coco-header-logo-blue.png';

const Logo = () => <img className={styles.logo} alt="obsess logo" src={OBSESS_LOGO_URL} />;

export default Logo;
