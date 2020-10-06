import * as THREE from 'three';

// import { SVGSpriteComponent, fetchSVGStringAsync } from 'three-svg';
// import { HoverCursorComponent } from 'three-cursor-style';
// import { PopUpComponent } from 'pop-up-component';
import fetchSVGStringAsync from './ProductMarkerHelper';
import InteractionObject from '../three-base-components/InteractionObject';
import SVGSpriteComponent from '../three-svg/SVGSpriteComponent';
import ModalComponent from '../modal-component/ModalComponent';
import { CollisionManagerActionEnums } from '../collision-manager/CollisionManager';

export default class ThreeProductMarker extends InteractionObject {
    constructor(componentToRender, renderProps) {
        super();

        const modalComponent = new ModalComponent(componentToRender, renderProps, this.dispose);
        this.attachComponent(modalComponent);

        const svgUrl = 'https://cdn.obsess-vr.com/product-hotspot-icon-circle.svg';
        fetchSVGStringAsync(svgUrl)
            .then((svgString) => {
                this.svgSpriteComponent.setSVGString(svgString);
            })
            .catch((error) => console.error(error)); // eslint-disable-line no-console

        // const hoverCursorComponent = new HoverCursorComponent('pointer', 'all-scroll');
        // this.attachComponent(hoverCursorComponent);

        this.svgSpriteComponent = null;
    }

    addToScene = (scene) => {
        this.scene = scene;
        scene.add(this.sceneObject);

        this.sceneObject.name = 'marker';
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
        this.visualObject.matrix.decompose(this.visualObject.position, this.visualObject.quaternion, this.visualObject.scale);
    }

    setPosition = (x, y, z) => {
        this.sceneObject.position.x = x;
        this.sceneObject.position.y = y;
        this.sceneObject.position.z = z;

        this.visualObject.position.x = x;
        this.visualObject.position.y = y;
        this.visualObject.position.z = z;
    }

    renderComponentImmediately = () => {
        this.components.forEach((component) => {
            component.onClick();
        });
    }

    removeFromManager() {
        const colliderDispatch = this.getColliderDispatcher();

        colliderDispatch({
            type: CollisionManagerActionEnums.REMOVE_COLLIDERS,
            payload: this.sceneObject.uuid,
        });
    }
}
