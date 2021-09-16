import React from 'react';
import Background from '../three-background/Background';
import { CollisionManager } from '../collision-manager/CollisionManager';
import ColliderSphere from '../three-background/ColliderSphere';
import { UIManager } from '../ui-manager/UIManager';
import dynamic from 'next/dynamic'

const ThreeEditor = dynamic(
    () => import('./ThreeEditor').then((mod) => mod.ThreeEditor),
    { ssr: false }
);

const HotspotEditor = ({storeId}) => {
    return (
            <CollisionManager>
                <UIManager>
                    <ThreeEditor storeId={storeId}>
                        <ColliderSphere />
                        <Background />
                    </ThreeEditor>
                </UIManager>
            </CollisionManager>
    );
};

export default HotspotEditor;
