import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useThree } from '../three-editor/ThreeEditor';
import ThreeBackgroundCube from './ThreeBackgroundCube';
import { useCollisionManager, CollisionManagerActionEnums } from '../_DataManagers';

// SET LOD
const LOD = 3;

const BackgroundCube = ({ backgroundUrl }) => {
    const [state] = useThree();
    const [, colliderDispatch] = useCollisionManager();

    const cube = useRef();

    useEffect(() => {
        cube.current = new ThreeBackgroundCube(LOD);
        cube.current.resolveFaceMaterialIndexes(1);

        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: cube.current.sceneObject,
        });

        cube.current.addToScene(state.scene);
        cube.current.objectWireframe.addToScene(state.scene);

        return () => {
            colliderDispatch({
                type: CollisionManagerActionEnums.REMOVE_COLLIDERS,
                payload: cube.current.sceneObject.uuid,
            });

            cube.current.dispose();
        };
    }, []); // eslint-disable-line

    useEffect(() => {
        if (backgroundUrl) {
            cube.current.loadCubeTexture(backgroundUrl);
        }
    }, [backgroundUrl]);

    return null;
};

BackgroundCube.propTypes = {
    backgroundUrl: PropTypes.string,
};

export default BackgroundCube;
