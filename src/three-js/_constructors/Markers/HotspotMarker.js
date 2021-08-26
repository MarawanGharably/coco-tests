import * as THREE from 'three';

// import { HoverCursorComponent } from 'three-cursor-style';
// import { PopUpComponent } from 'pop-up-component';
import InteractionObject from '../../three-base-components/InteractionObject';
import SVGSpriteComponent from '../../three-svg/SVGSpriteComponent';
import ModalConstructor from '../ModalConstructor';
import { CollisionManagerActionEnums } from '../../collision-manager/CollisionManager';


//TODO: Marker constructor should not have any information regarding the Scene!!!
// this.scene - is a scene only constructor prop
// constructor should not fetch the data! 30 scene objects will

export default class HotspotMarker extends InteractionObject {
    constructor(componentToRender, renderProps) {
        super();
        // const modalComponent = new HoverCursorComponent('pointer', 'all-scroll');
        const modalComponent = new ModalConstructor(componentToRender, renderProps, this.dispose);
        this.modalComponentRenderProps = renderProps;
        this.attachComponent(modalComponent);

        const svgUrl = 'https://cdn.obsess-vr.com/product-hotspot-icon-circle.svg';
        this.fetchSVGStringAsync(svgUrl);

        this.svgSpriteComponent = null;
        this.isFlatBackground = false;
    }

     fetchSVGStringAsync= (url) =>{
         fetch(url)
            .then((response) => {
                if (response.status === 200) return response.text();
                throw new Error('svg load error!');
            })
            .then((svgString) => {
                this.svgSpriteComponent.setSVGString(svgString);
            })
            .catch((error) => Promise.reject(error));
    }

    addToScene = (scene) => {
        this.scene = scene;
        scene.add(this.sceneObject);

        this.sceneObject.name = 'marker';
        this.isFlatBackground = this.scene.children.some((child) => child.name === 'flatBackground');
        this.svgSpriteComponent = new SVGSpriteComponent(this.visualTransform);
        this.attachComponent(this.svgSpriteComponent);
    }

    setTransform = (colliderTransform, visualTransform) => {
        const colliderMatrix = new THREE.Matrix4();
        colliderMatrix.fromArray(colliderTransform);

        const visualMatrix = new THREE.Matrix4();
        visualMatrix.fromArray(visualTransform);

        this.sceneObject.setTransform(colliderMatrix);

        this.visualObject.matrix = visualMatrix;
        this.visualObject.matrix.decompose(
            this.visualObject.position, this.visualObject.quaternion, this.visualObject.scale,
        );

        const { x, y, z } = this.sceneObject.position;
        this.setPosition(x, y, z);
    }

    setScale = (scale = 0.45) => {
        this.sceneObject.scale.x = scale;
        this.sceneObject.scale.y = scale;
        this.sceneObject.scale.z = scale;
    }




    removeFromManager() {
        const colliderDispatch = this.getColliderDispatcher();

        colliderDispatch({
            type: CollisionManagerActionEnums.REMOVE_COLLIDERS,
            payload: this.sceneObject.uuid,
        });
    }
}
