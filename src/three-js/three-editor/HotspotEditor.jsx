import React from 'react';
import { useSelector } from 'react-redux';
import Background from '../three-background/Background';
import { CollisionManager } from '../collision-manager/CollisionManager';
import ColliderSphere from '../three-background/ColliderSphere';
import { UIManager } from '../ui-manager/UIManager';
import { DataManager } from '../data-manager/DataManager';
import dynamic from 'next/dynamic'

const ThreeEditor = dynamic(
    () => import('./ThreeEditor').then((mod) => mod.ThreeEditor),
    { ssr: false }
);

const HotspotEditor = () => {
    const { selectedStoreId } = useSelector(state => state['HomePageStore']);
    const { currentSceneId } = useSelector(state => state['SceneEditor']);

    return (
        <DataManager hotspotTypes={['product', 'product_image']} sceneId={currentSceneId} storeId={selectedStoreId}>
            <CollisionManager>
                <UIManager>
                    <ThreeEditor>
                        <ColliderSphere />
                        <Background />
                    </ThreeEditor>
                </UIManager>
            </CollisionManager>
        </DataManager>
    );
};

export default HotspotEditor;
