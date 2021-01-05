import * as THREE from 'three';

import ThreeSceneObject from '../three-base-components/ThreeSceneObject';
import WireframeHelper from './WireframeHelper';

const LOD_TO_GRID_SIZE_MAP = Object.freeze({
    1: 2,
    2: 4,
    3: 8,
});

/**
 * LOD 1 (1k):
 *  2x2 grid per face made of 512x512 textures
 * LOD 2 (2k):
 *  4x4 grid per face made of 512x512 textures
 * LOD 3 (4k):
 *  8x8 grid per face made of 512x512 textures
 */

/**
 * Key: Index or Arr | Side of Cube | Coordinate representation
 * index: 0     | Back      | px
 * index: 1     | Front     | nx
 * index: 2     | Top       | py
 * index: 3     | Bottom    | ny
 * index: 4     | Right     | pz
 * index: 5     | Left      | nz
*/

export default class ThreeBackgroundCube extends ThreeSceneObject {
    constructor(LOD = 1) {
        super();

        this.LOD = LOD;
        this.gridSize = LOD_TO_GRID_SIZE_MAP[LOD];

        const geometry = new THREE.BoxGeometry(
            -20,
            20,
            20,
            this.gridSize,
            this.gridSize,
            this.gridSize,
        );
        geometry.rotateY(THREE.MathUtils.degToRad(180));
        this.setupFaceUV(geometry);

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        this.sceneObject = new THREE.Mesh(geometry, material);
        this.objectWireframe = new WireframeHelper(geometry);
        this.objectWireframe.sceneObject.visible = false;

        this.loader = this.setupTextureLoader();
    }

    setupTextureLoader = () => {
        const loadingManager = new THREE.LoadingManager();
        const loader = new THREE.TextureLoader(loadingManager);

        return loader;
    }

    loadCubeTexture = (url) => {
        // const baseUrl = 'https://cdn.obsessvr.com/obsess-cms-beta/clients/Coach/5f04a065ec0821b7050996d6/scenes/5f04a065ec0821b7050996d5/images/cube_map';

        // const loadOrder = [
        //     `${baseUrl}/1k_back.jpg`,
        //     `${baseUrl}/1k_front.jpg`,
        //     `${baseUrl}/1k_top.jpg`,
        //     `${baseUrl}/1k_bottom.jpg`,
        //     `${baseUrl}/1k_right.jpg`,
        //     `${baseUrl}/1k_left.jpg`,
        // ];

        const loadOrder = this.buildLODUrls(url);

        this.loader = this.setupTextureLoader();

        const meshMaterials = loadOrder.map((img) => {
            const texture = this.loader.load(img);
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;

            return new THREE.MeshBasicMaterial({ map: texture });
        });

        this.sceneObject.material = meshMaterials;
    }

    // Build load order of cubemaps
    buildLODUrls = (baseUrl) => {
        if (!baseUrl) {
            return null;
        }

        // controls current configuration of cube object
        const loadObject = {
            back: [],
            front: [],
            top: [],
            bottom: [],
            right: [],
            left: [],
        };

        const iterations = this.gridSize;
        Object.keys(loadObject).forEach((side) => {
            for (let i = iterations - 1; i >= 0; i -= 1) {
                for (let j = 0; j < iterations; j += 1) {
                    const imageName = `${baseUrl}${this.LOD}k_${side}_${i}_${j}.jpg`;
                    loadObject[side].push(imageName);
                }
            }
        });

        const loadOrder = Object.values(loadObject).reduce((accumulator, currentValue) => {
            currentValue.forEach((value) => accumulator.push(value));
            return accumulator;
        });

        return loadOrder;
    }

    resolveFaceMaterialIndexes = () => { // eslint-disable-line
        let currentMaterialIndex = 0;
        this.sceneObject.geometry.faces.forEach((face, index) => {
            face.materialIndex = currentMaterialIndex; // eslint-disable-line

            if (index % 2 === 1) {
                currentMaterialIndex += 1;
            }
        });
    }

    setupFaceUV = (geometry) => {
        const uvArr = geometry.faceVertexUvs[0];
        /* eslint-disable */
        uvArr.forEach((faceUV, index) => {
            if (index % 2 === 0) {
                faceUV[0].x = 0;
                faceUV[0].y = 1;
                faceUV[1].x = 0;
                faceUV[1].y = 0;
                faceUV[2].x = 1;
                faceUV[2].y = 1;
            } else {
                faceUV[0].x = 0;
                faceUV[0].y = 0;
                faceUV[1].x = 1;
                faceUV[1].y = 0;
                faceUV[2].x = 1;
                faceUV[2].y = 1;
            }
        });
        /* eslint-enable */
    }

    dispose() {
        super.dispose();

        this.sceneObject.material.forEach((texture) => texture.dispose());
        this.sceneObject.geometry.dispose();
        this.sceneObject = null;
    }
}
