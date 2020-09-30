import { useEffect, useRef } from 'react';
import { useThree } from '../three-editor/ThreeEditor';
import ThreeBackgroundCube from './ThreeBackgroundCube';
import { useCollisionManager, CollisionManagerActionEnums } from '../collision-manager/CollisionManager';


const BackgroundCube = () => {
    const [state] = useThree();
    const [, colliderDispatch] = useCollisionManager();

    const cube = useRef();

    useEffect(() => {
        cube.current = new ThreeBackgroundCube();

        cube.current.loadCubeTexture('test', 1);
        cube.current.resolveFaceMaterialIndexes(1);

        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: cube.current.sceneObject,
        });

        cube.current.addToScene(state.scene);
        cube.current.objectWireframe.addToScene(state.scene);
        return () => {
            cube.current.removeFromScene();
            cube.current.dispose();
        };
    }, []); // eslint-disable-line

    return (
        null
    );
};

export default BackgroundCube;
