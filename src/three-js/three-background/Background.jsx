import React, { useState, useEffect } from 'react';
import { formURL } from '../../utils/urlHelper';
import BackgroundCube from './BackgroundCube';
import FlatBackground from './FlatBackgound';

const Background = ({ scene, sceneData }) => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [isFlatScene, setFlatScene] = useState(false);


    useEffect(() => {
        if(sceneData){
            const url = sceneData.cube_map_dir || sceneData.flat_scene_url;
            setFlatScene(!!sceneData.flat_scene_url);
            setBackgroundUrl(formURL(url));
        }
    }, [sceneData]);


    return (
        isFlatScene
            ? <FlatBackground backgroundUrl={backgroundUrl} scene={scene}/>
            : <BackgroundCube backgroundUrl={backgroundUrl} scene={scene}/>
    );
};

export default Background;
