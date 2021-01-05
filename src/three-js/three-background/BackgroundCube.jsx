import { useEffect, useRef } from 'react';
import { useThree } from '../three-editor/ThreeEditor';
import ThreeBackgroundCube from './ThreeBackgroundCube';
import { useCollisionManager, CollisionManagerActionEnums } from '../collision-manager/CollisionManager';
import { useEditorDataStore } from '../../data-store/editor-data-store/EditorDataStore';
import { formURL } from '../../utils/urlHelper';

// SET LOD
const LOD = 2;

const BackgroundCube = () => {
    const [state] = useThree();
    const [, colliderDispatch] = useCollisionManager();
    const [editorState] = useEditorDataStore();

    const { currentSceneId, sceneData } = editorState;

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
            cube.current.removeFromScene();
            cube.current.dispose();
        };
    }, []); // eslint-disable-line

    useEffect(() => {
        sceneData.filter((scene) => {
            if (scene._id.$oid === currentSceneId) { // eslint-disable-line
                const cubemapDir = formURL(scene.cube_map_dir);
                cube.current.loadCubeTexture(cubemapDir);
                return scene;
            }
            return null;
        });
    }, [currentSceneId, sceneData]);

    return (
        null
    );
};

export default BackgroundCube;
