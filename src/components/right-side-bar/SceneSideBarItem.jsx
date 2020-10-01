import React from 'react';
import PropTypes from 'prop-types';

const SceneSideBarItem = ({
    sceneId, sceneName, thumbnail, selected, sceneClickHandler,
}) => (
    <div
        className={`scene-item flex flex-center flex-column ${selected ? 'scene-item-selected' : 'scene-item-border'}`}
        tabIndex={0}
        role="button"
        onClick={() => sceneClickHandler(sceneId)}
        onKeyDown={(e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                sceneClickHandler(sceneId);
            }
        }}
    >
        <div className="scene-item-container flex flex-center">
            <img alt={`${sceneName} preview`} src={thumbnail} />
        </div>
        <span className="scene-item-name">{sceneName}</span>
    </div>
);

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
