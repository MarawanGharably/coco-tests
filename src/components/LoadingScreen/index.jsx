import React from 'react';
import Loader from '../loader/Loader';
import styles from './LoadingScreen.module.scss';

export default function LoadingScreen(){
    return (
        <div className={styles['loading-screen']}>
            <Loader />
        </div>
    )
};

