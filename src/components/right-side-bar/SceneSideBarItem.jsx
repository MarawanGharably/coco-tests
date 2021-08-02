import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentSideBarItem.module.scss';

const SceneSideBarItem = ({ sceneId, sceneName, thumbnail, selected, sceneClickHandler}) => {
    return (
        <div
            className={`${styles['scene-item']} d-flex flex-center flex-column ${selected ? styles['scene-item-selected'] : styles['scene-item-border']}`}
            tabIndex={0}
            role="button"
            onClick={() => sceneClickHandler(sceneId)}
            onKeyDown={(e) => {
                if (e.keyCode === 13 || e.keyCode === 32) {
                    sceneClickHandler(sceneId);
                }
            }}
        >
            <div className={`${styles['scene-item-container']} d-flex flex-center`}>
                <img alt={`${sceneName} preview`} src={thumbnail} />
            </div>
            <span className={styles['scene-item-name']}>{sceneName}</span>
        </div>
    )
};

SceneSideBarItem.propTypes = {
    sceneId: PropTypes.string.isRequired,
    sceneName: PropTypes.string,
    thumbnail: PropTypes.string,
    selected: PropTypes.bool,
    sceneClickHandler: PropTypes.func.isRequired,
};

SceneSideBarItem.defaultProps = {
    sceneName: '',
    thumbnail: '',
    selected: false,
};

export default SceneSideBarItem;
