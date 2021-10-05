import { useEffect, useRef } from 'react';
import { useThree } from '../three-editor/ThreeEditor';
import { useCollisionManager, CollisionManagerActionEnums } from '../_contextDataManagers/CollisionManager';
import ThreeColliderSphere from './ThreeColliderSphere';

const ColliderSphere = () => {
    const [state] = useThree();
    const [, colliderDispatch] = useCollisionManager();

    const sphere = useRef();

    useEffect(() => {
        sphere.current = new ThreeColliderSphere();

        colliderDispatch({
            type: CollisionManagerActionEnums.SET_COLLIDERS,
            payload: sphere.current.sceneObject,
        });

        sphere.current.addToScene(state.scene);

        return () => {
            sphere.current.removeFromScene();
            sphere.current.dispose();
        };
    }, []); // eslint-disable-line

    return (
        null
    );
};

export default ColliderSphere;
