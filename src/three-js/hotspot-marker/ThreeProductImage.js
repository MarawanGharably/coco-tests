import * as THREE from 'three';

import InteractionObject from '../three-base-components/InteractionObject';
import ModalComponent from '../modal-component/ModalComponent';
import { CollisionManagerActionEnums } from '../collision-manager/CollisionManager';
import ThreeLoadingManager from '../three-loading-manager/three-loading-manager';

export default class ThreeProductImage extends InteractionObject {
    constructor(componentToRender, renderProps) {
        super();
        const modalComponent = new ModalComponent(componentToRender, {
            ...renderProps,
            setScale: this.setScale,
            setRenderOrder: this.setRenderOrder.bind(this),
        }, this.dispose);
        this.modalComponentRenderProps = renderProps;
        this.attachComponent(modalComponent);
        this.initVisualObject();
    }

    initVisualObject() {
        const { imageUrl, renderOrder } = this.modalComponentRenderProps;

        this.setVisualObject(new THREE.Mesh());
        this.setImage(imageUrl);
        this.setRenderOrder(renderOrder);
    }

    addToScene = (scene) => {
        this.scene = scene;
        this.camera = scene.children.find((child) => child.type === 'PerspectiveCamera');
        this.sceneObject.name = 'marker';
        scene.add(this.sceneObject);
        scene.add(this.visualObject);
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
    }

    setScale = (scale = 1) => {
        this.sceneObject.scale.set(scale, scale, scale);
        this.visualObject.scale.set(scale, scale, scale);
    }

    setPosition = (x, y, z) => {
        this.sceneObject.position.set(x, y, z);
        this.sceneObject.position.clampLength(10, 10);
        this.visualObject.position.copy(this.sceneObject.position);
        this.visualObject.lookAt(this.camera.position);
        this.sceneObject.lookAt(this.camera.position);
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

    setNewGeometry(width, height, texture) {
        const { scale } = this.modalComponentRenderProps;
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({
            map: texture, transparent: true, depthTest: false,
        });

        this.visualObject.geometry = geometry;
        this.visualObject.material = material;
        this.sceneObject.geometry = new THREE.BoxGeometry(width, height, 0.001);
        this.setScale(scale);
    }

    setImage(url) {
        const loader = new THREE.TextureLoader(ThreeLoadingManager);

        loader.load(url, (texture) => {
            const { image } = texture;
            const width = image.width / image.height;
            const height = 1;

            this.setNewGeometry(width, height, texture);
        });
    }

    setRenderOrder(renderOrder) {
        this.visualObject.renderOrder = renderOrder;
        this.sceneObject.renderOrder = renderOrder;
    }

    dispose() {
        this.removeFromManager();
        this.scene.remove(this.visualObject);
        this.scene.remove(this.sceneObject);
        this.setVisualObject(null);
    }
}
