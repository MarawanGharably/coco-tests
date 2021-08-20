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

const HotspotEditor = ({storeId}) => {
    const { currentSceneId } = useSelector(state => state['SceneEditor']);

    return (
        <DataManager hotspotTypes={['product', 'product_image']} sceneId={currentSceneId} storeId={storeId}>
            <CollisionManager>
                <UIManager>
                    <ThreeEditor storeId={storeId}>
                        <ColliderSphere />
                        <Background />
                    </ThreeEditor>
                </UIManager>
            </CollisionManager>
        </DataManager>
    );
};

export default HotspotEditor;
