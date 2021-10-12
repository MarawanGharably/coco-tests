import * as THREE from 'three';
import InteractionObject from '../../three-base-components/InteractionObject';
import SVGSpriteComponent from '../../three-svg/SVGSpriteComponent';
// import ModalConstructor from '../ModalConstructor';
import { CollisionManagerActionEnums } from '../../_DataManagers/CollisionManager';


export default class HotspotMarker extends InteractionObject {
    constructor({data, UIConfig}) {
        super();
        // this.attachComponent(modalComponent);

        this.hotspot_type = 'hotspot_marker'; //type of marker
        this.data = data; //stores custom user data
        this.UIConfig = UIConfig; //could be used for modals

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
