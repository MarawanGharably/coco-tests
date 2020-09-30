import React from 'react';
import { ThreeEditor } from './ThreeEditor';
import BackgroundCube from '../three-background/BackgroundCube';
import { CollisionManager } from '../collision-manager/CollisionManager';
import ColliderSphere from '../three-background/ColliderSphere';
import { UIManager } from '../ui-manager/UIManager';

const HotspotEditor = () => (
    <CollisionManager>
        <UIManager>
            <ThreeEditor>
                <ColliderSphere />
                <BackgroundCube />
            </ThreeEditor>
        </UIManager>
    </CollisionManager>
);

export default HotspotEditor;
