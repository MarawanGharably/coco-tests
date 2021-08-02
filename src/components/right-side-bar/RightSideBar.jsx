import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import styles from './RightSideBar.module.scss';

const RightSideBar = ({  title, className, children}) => {
    return (
        <div className={`${styles['side-bar-container']} ${className}`}>
            {title && <div className={styles['side-bar-container-title']}>{title}</div>}
            <Row className={styles['right-side-bar']}>
                {children}
            </Row>
        </div>
    );
};

RightSideBar.propTypes = {
    cols: PropTypes.string,
    rowHeight: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
};

RightSideBar.defaultProps = {
    cols: '1',
    rowHeight: '10em',
    title: '',
    className: '',
};

export default RightSideBar;
