import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentSideBarItem.module.scss';

const ContentSideBarItem = ({ selected, name, thumbnail }) => (
    <div className={`${styles['product-item']} flex flex-center flex-column ${selected ? styles['product-item-selected'] : styles['product-item-border'] }`}>
        <span className={styles['product-item-name']}>{name}</span>
        <div className={`${styles['product-item-container']} flex flex-center`}>
            <img alt={`${name} content preview`} src={thumbnail} />
        </div>
        <div className={styles["content-url-remover"]}>link to remove image/item with x</div>
    </div>
);

ContentSideBarItem.propTypes = {
    selected: PropTypes.bool,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
};

ContentSideBarItem.defaultProps = {
    selected: false,
    name: '',
    thumbnail: '',
};

export default ContentSideBarItem;
