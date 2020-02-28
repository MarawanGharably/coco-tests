import React from 'react';
import SceneNavigatorItem from './SceneNavigatorItem';

const mockSceneData = [
    {
        sceneId: 1,
        name: 'View 1',
    },
    {
        sceneId: 2,
        name: 'View 2',
    },
    {
        sceneId: 3,
        name: 'View 3',
    },
];

const SceneNavigator = () => {
    const renderScenes = () => mockSceneData.map((scene, index) => (
        <SceneNavigatorItem
            key={scene.sceneId}
            sceneId={scene.sceneId}
            name={scene.name}
            index={index}
        />
    ));

    return (
        <div className="scene-navigator flex">
            {renderScenes()}
        </div>
    );
};

export default SceneNavigator;
