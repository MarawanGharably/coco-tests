import React, { useEffect } from 'react';
import { ThreeEditor } from './ThreeEditor';
import BackgroundCube from '../three-background/BackgroundCube';
import { CollisionManager } from '../collision-manager/CollisionManager';
import ColliderSphere from '../three-background/ColliderSphere';
import { UIManager } from '../ui-manager/UIManager';
import { DataManager } from '../data-manager/DataManager';


const HotspotEditor = () => {
    useEffect(() => {

    }, []);

    return (
        <DataManager hotspotType="product" sceneId="5f5fc6011f2c164d4c0ac383">
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
