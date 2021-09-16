import React from 'react';
import PropTypes from 'prop-types';
import styles from './SceneThumbnail.module.scss';
import {formURL} from "../../../utils/urlHelper";

const SceneThumbnail = ({ scene, selected, sceneClickHandler }) => {
    if(!scene) return;
    const { name } = scene;
    const sceneId = scene._id.$oid;

    const getThumbnail = (scene) => {
        if (scene.cube_map_dir) return `${formURL(scene.cube_map_dir)}1k_front.jpg`;
        else if (scene.flat_scene_url) return formURL(scene.flat_scene_url);
        return '';
    };

    const thumbnail = getThumbnail(scene);

    return (
        <div
            className={`${styles['scene-thumbnail']} d-flex flex-center flex-column ${selected ? styles['selected'] : ''}`}
            onClick={() => sceneClickHandler(sceneId)}
            onKeyDown={(e) => {
                if ([13, 32].includes(e.keyCode)) sceneClickHandler(sceneId);
            }}
        >
            <div className={styles.imagePreview} style={{ backgroundImage: `url(${thumbnail})` }} />
            <span className={styles['caption']}>{name.replace(/[_-]/g, ' ')}</span>
        </div>
    );
};



SceneThumbnail.propTypes = {
    sceneName: PropTypes.string,
    thumbnail: PropTypes.string,
    selected: PropTypes.bool,
    sceneClickHandler: PropTypes.func.isRequired,
};

SceneThumbnail.defaultProps = {
    sceneName: '',
    thumbnail: '',
    selected: false,
};

export default SceneThumbnail;
