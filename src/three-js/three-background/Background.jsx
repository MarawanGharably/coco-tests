import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formURL } from '../../utils/urlHelper';
import BackgroundCube from './BackgroundCube';
import FlatBackground from './FlatBackgound';

const Background = () => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [isFlatScene, setFlatScene] = useState(false);
    const { currentSceneId, sceneData } = useSelector(state => state['SceneEditor']);

    useEffect(() => {
        sceneData.forEach((scene) => {
            if (scene._id.$oid === currentSceneId) { // eslint-disable-line
                const url = scene.cube_map_dir || scene.flat_scene_url;

                setFlatScene(!!scene.flat_scene_url);
                setBackgroundUrl(formURL(url));
            }
        });
    }, [currentSceneId, sceneData]);

    return (
        isFlatScene
            ? <FlatBackground backgroundUrl={backgroundUrl} />
            : <BackgroundCube backgroundUrl={backgroundUrl} />
    );
};

export default Background;
