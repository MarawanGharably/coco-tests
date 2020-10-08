import React from 'react';
import { ThreeEditor } from './ThreeEditor';
import BackgroundCube from '../three-background/BackgroundCube';
import { CollisionManager } from '../collision-manager/CollisionManager';
import ColliderSphere from '../three-background/ColliderSphere';
import { UIManager } from '../ui-manager/UIManager';
import { DataManager } from '../data-manager/DataManager';
import { useEditorDataStore } from '../../data-store/editor-data-store/EditorDataStore';
import { useHomePageDataStore } from '../../data-store/home-page-data-store/HomePageDataStore';


const HotspotEditor = () => {
    const [editorState] = useEditorDataStore();
    const [storeState] = useHomePageDataStore();

    const { currentSceneId } = editorState;
    const { selectedStoreId } = storeState;

    return (
        <DataManager hotspotType="product" sceneId={currentSceneId} storeId={selectedStoreId}>
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
