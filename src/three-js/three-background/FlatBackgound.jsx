import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ThreeFlatBackground from './ThreeFlatBackground';
import { useThree } from '../three-editor/ThreeEditor';
import { useCollisionManager, CollisionManagerActionEnums } from '../collision-manager/CollisionManager';

const FlatBackground = ({ backgroundUrl }) => {
    const [state] = useThree();
    const [, colliderDispatch] = useCollisionManager();
    const flatBackground = useRef();

    useEffect(() => {
        flatBackground.current = new ThreeFlatBackground();

        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: flatBackground.current.sceneObject,
        });

        flatBackground.current.addToScene(state.scene);
        window.addEventListener('resize', flatBackground.current.setPanArea);

        return () => {
            colliderDispatch({
                type: CollisionManagerActionEnums.REMOVE_COLLIDERS,
                payload: flatBackground.current.sceneObject.uuid,
            });

            flatBackground.current.dispose();
            window.removeEventListener('resize', flatBackground.current.setPanArea);
        };
    }, []);

    useEffect(() => {
        if (backgroundUrl) {
            flatBackground.current.loadTexture(backgroundUrl);
        }
    }, [backgroundUrl]);

    return null;
};

FlatBackground.propTypes = {
    backgroundUrl: PropTypes.string.isRequired,
};

export default FlatBackground;
