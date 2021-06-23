import React from 'react';
import { useSelector } from 'react-redux';
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
    const HomePageStore = useSelector(state => state['HomePageStore']);
    const { selectedStoreId } = HomePageStore;


    return (
        <DataManager hotspotTypes={['product', 'product_image']} sceneId={currentSceneId} storeId={selectedStoreId}>
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
