import React, { useState, useEffect } from 'react';
import { formURL } from '../../utils/urlHelper';
import BackgroundCube from './BackgroundCube';
import FlatBackground from './FlatBackgound';

const Background = ({ currentSceneId, sceneEditorRecords}) => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [isFlatScene, setFlatScene] = useState(false);

    useEffect(() => {
        const sceneData = sceneEditorRecords.find(scene=>scene._id.$oid === currentSceneId);
        if(sceneData){
            const url = sceneData.cube_map_dir || sceneData.flat_scene_url;
            setFlatScene(!!sceneData.flat_scene_url);
            setBackgroundUrl(formURL(url));
        }
    }, [currentSceneId, sceneEditorRecords]);

    return (
        isFlatScene
            ? <FlatBackground backgroundUrl={backgroundUrl}/>
            : <BackgroundCube backgroundUrl={backgroundUrl}/>
    );
};

export default Background;
