import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import { useEditorDataStore, EditorActionEnums } from '../../data-store/editor-data-store/EditorDataStore';

const SceneNavigatorItem = ({ sceneId, name, index }) => {
    const [selected, setSelected] = useState(false);

    const [state, dispatch] = useEditorDataStore();
    const { currentlySelected } = state;

    // useEffect toggles highlight of views with indexes equal or lesser to currently selected index
    // e.g.: currentlySelected=1 (indexed @ 0) will highlight [**NavItem1**, **NavItem2**, NavItem3]
    useEffect(() => {
        if (index <= currentlySelected) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [currentlySelected, index]);

    const handleClick = () => {
        dispatch({
            type: EditorActionEnums.SET_CURRENTLY_SELECTED,
            payload: {
                currentlySelected: index,
                sceneId,
            },
        });
    };

    const sceneNameStyle = css`
        color: ${selected && '#3c76fa'};
    `;

    const sceneArrowStyle = css`
        border-left: 2px solid ${selected ? '#3c76fa' : 'black'};
        border-top: 2px solid ${selected ? '#3c76fa' : 'black'};
    `;

    return (
        <div className="scene-navigator-item">
            <div className="scene-navigator-item-container flex">
                {index === 0 ? '' : <div className="scene-navigator-item-arrow" css={sceneArrowStyle} />}
                <button className="scene-navigator-item-button" type="button" onClick={handleClick}>
                    <span className="scene-navigator-item-name" css={sceneNameStyle}>{name}</span>
                </button>
            </div>
        </div>
    );
};

SceneNavigatorItem.propTypes = {
    sceneId: PropTypes.string,
    name: PropTypes.string,
    index: PropTypes.number,
};

SceneNavigatorItem.defaultProps = {
    sceneId: '',
    name: '',
    index: 0,
};

export default SceneNavigatorItem;
