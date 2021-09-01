import * as THREE from 'three';

import ThreeSceneObject from './ThreeSceneObject';
import ThreeSceneObjectComponent from './ThreeSceneObjectComponent';
import BoxCollider from './BoxCollider';

export default class InteractionObject extends ThreeSceneObject {
    constructor() {
        super();

        this.sceneObject = new BoxCollider(1, 1, 1, this.onHover, this.onUnhover, this.onClick);
        this.sceneObject.setOwner(this);
        this.UIDispatcher = null;
        // this.visualObject = null;
    }

    /**
     * Call all the onHover function on the components attached to this InteractableObject.
     * Call when the collider attached to this InteractableObject is hovered.
     */
    onHover = () => {
        this.components.forEach((component) => {
            if (component.onHover) component.onHover();
        });
    }

    /**
     * Call all the onUnhover function on the components attached to this InteractableObject.
     * Call when the collider attached to this InteractableObject is unhovered.
     */
    onUnhover = () => {
        this.components.forEach((component) => {
            if (component.onUnhover) component.onUnhover();
        });
    }

    /**
     * Call all the onClick function on the components attached to this InteractableObject.
     * Call when the collider attached to this InteractableObject is clicked.
     */
    onClick = () => {
        this.components.forEach((component) => {
            if (component.onClick) component.onClick();
        });
    }

    /**
     * Set the visiualObject attached to this InteractableObject.
     * @param {THREE.Object3D} visualObject - the visual representation of this InteractableObject
     */
    // TODO: To make this more generic, we can refactor the visual object into a component as well.
    setVisualObject = (visualObject) => {
        if (!visualObject) {
            this.visualObject = null;
            return;
        }
        if (!(visualObject instanceof THREE.Object3D)) {
            console.error('Can\'t set visual object to a non THREE.Object3D type!'); // eslint-disable-line no-console
            return;
        }
        this.visualObject = visualObject;
    }

    // setPosition = (positionVector) => {
    //     this.visualObject.position = positionVector;
    //     this.BoxCollider.position = positionVector;
    // }
    setPosition = (x, y, z) => {
        this.sceneObject.position.set(x, y, z);

        if (this.isFlatBackground) {
            this.sceneObject.position.x = -10;
        } else {
            this.sceneObject.position.clampLength(10, 10);
        }

        this.visualObject.position.copy(this.sceneObject.position);
    }


    /**
     * Set the transform of the visualObject attached to this InteractableObject.
     * @param {Array} transformArray - 4x4 matrix transform of the visualObject
     */
    setTransform = (transformArray) => {
        if (!this.visualObject) {
            console.error('Can\'t set transform on an interactable object without a visual object!'); // eslint-disable-line no-console
            return;
        }

        const { visualObject } = this;
        const matrix4x4 = new THREE.Matrix4();
        matrix4x4.fromArray(transformArray);
        visualObject.matrix = matrix4x4;
        visualObject.matrix.decompose(
            visualObject.position,
            visualObject.quaternion,
            visualObject.scale,
        );
    }

    /**
     * Set the transform of the collider attached to this InteractableObject.
     * @param {Array} transformArray - 4x4 matrix transform of the collider
     */
    setColliderTransform = (colliderTransformArray) => {
        const matrix4x4 = new THREE.Matrix4();
        matrix4x4.fromArray(colliderTransformArray);
        this.sceneObject.setTransform(matrix4x4);
    }

    /**
     * Attach this ThreeSceneObjectComponent to this InteractableObject
     * @param {ThreeSceneObjectComponent} component - an ThreeSceneObjectComponent
     */
    attachComponent = (component) => {
        if (!(component instanceof ThreeSceneObjectComponent)) {
            console.error('Can\'t attach object of non ThreeSceneObjectComponent type to an InteractableObject!'); // eslint-disable-line no-console
            return;
        }

        component.setOwner(this);
        this.components.push(component);
    }


    renderComponentImmediately = () => {
        this.components.forEach((component) => {
            component.onClick();
        });
    }

    getTransforms = () => {
        const colliderTransform = this.sceneObject.matrix;
        const visualTransform = this.visualObject.matrix;
        return { colliderTransform, visualTransform };
    }

    /**
     * Remove this ThreeSceneObjectComponent from this InteractableObject
     * @param {ThreeSceneObjectComponent} component - an ThreeSceneObjectComponent
     */
    removeComponent = (component) => {
        if (!(component instanceof ThreeSceneObjectComponent)) {
            console.error('Can\'t remove object of non ThreeSceneObjectComponent type from an InteractableObject!'); // eslint-disable-line no-console
            return;
        }
        const index = this.components.indexOf(component);
        if (index === -1) {
            console.error(`Interactable Object has no ThreeSceneObjectComponent ${component}`); // eslint-disable-line no-console
            return;
        }

        component.removeOwner();
        this.components.splice(index, 1);
        component.onDestroy();
    }

    setUIDispatcher = (dispatch) => {
        this.UIDispatcher = dispatch;
    }

    getUIDispatcher = () => {
        if (!this.UIDispatcher) {
            console.error('UIDispatcher doesn\'t exist on this InteractableObject!'); // eslint-disable-line no-console
            return null;
        }
        return this.UIDispatcher;
    }

    setColliderDispatcher = (dispatch) => {
        this.colliderDispatcher = dispatch;
    }

    getColliderDispatcher = () => {
        if (!this.colliderDispatcher) {
            console.error('colliderDispatcher doesn\'t exist on this InteractableObject!'); // eslint-disable-line no-console
            return null;
        }
        return this.colliderDispatcher;
    }
}
