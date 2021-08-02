import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => (
    <div className="full-width flex flex-center">
        <div className={styles.loader} />
    </div>
);

export default Loader;
