import React from 'react';
import { ThreeEditor } from './ThreeEditor';
import BackgroundCube from '../three-background/BackgroundCube';
import { CollisionManager } from '../collision-manager/CollisionManager';
import ColliderSphere from '../three-background/ColliderSphere';
import { UIManager } from '../ui-manager/UIManager';
import { DataManager } from '../data-manager/DataManager';
import { useEditorDataStore } from '../../data-store/editor-data-store/EditorDataStore';


const HotspotEditor = () => {
    const [editorState] = useEditorDataStore();

    const { currentSceneId } = editorState;

    return (
        <DataManager hotspotType="product" sceneId={currentSceneId}>
            <CollisionManager>
                <UIManager>
                    <ThreeEditor>
                        <ColliderSphere />
                        <BackgroundCube />
                    </ThreeEditor>
                </UIManager>
            </CollisionManager>
        </DataManager>
    );
};

export default HotspotEditor;
