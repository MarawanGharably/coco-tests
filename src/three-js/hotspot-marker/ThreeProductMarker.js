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
        this.modalComponentRenderProps = renderProps;
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
        this.isFlatBackground = false;
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

    setPosition = (x, y, z) => {
        this.sceneObject.position.set(x, y, z);

        if (this.isFlatBackground) {
            this.sceneObject.position.x = -10;
        } else {
            this.sceneObject.position.clampLength(10, 10);
        }

        this.visualObject.position.copy(this.sceneObject.position);
    }

    renderComponentImmediately = () => {
        this.components.forEach((component) => {
            component.onClick();
        });
    }

    // Retrieves Matrix transforms of visual and collider components
    getTransforms = () => {
        const colliderTransform = this.sceneObject.matrix;
        const visualTransform = this.visualObject.matrix;
        return { colliderTransform, visualTransform };
    }

    removeFromManager() {
        const colliderDispatch = this.getColliderDispatcher();

        colliderDispatch({
            type: CollisionManagerActionEnums.REMOVE_COLLIDERS,
            payload: this.sceneObject.uuid,
        });
    }
}
