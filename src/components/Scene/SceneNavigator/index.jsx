import React from 'react';
import { useDispatch } from 'react-redux';
import SceneThumbnail from '../SceneThumbnail';
import Slideshow from '../../Slideshow';
import { setCurrentSceneID } from '../../../store/actions/SceneEditorActions';
import styles from './SceneNavigator.module.scss';
import mock from '../../../assets/mocks/scenesListMock.json';

export default function SceneNavigator ({ sceneEditor, className='' }){
    const dispatch = useDispatch();
    const { sceneData, currentSceneId } = sceneEditor;

    const sceneClickHandler = (sceneId) => {
        if (sceneId !== currentSceneId) dispatch(setCurrentSceneID(sceneId));
    };

    return (
        <Slideshow className={`${styles['scene-navigator']} ${className}`}>
            { sceneData?.map((scene) => (
                <SceneThumbnail
                    key={scene._id.$oid} // eslint-disable-line
                    scene={scene}
                    selected={currentSceneId === scene._id.$oid} // eslint-disable-line
                    sceneClickHandler={sceneClickHandler}
                />
            ))}
        </Slideshow>
    );
};


