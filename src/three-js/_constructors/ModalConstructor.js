import { v1 as uuidv1 } from 'uuid';

import ThreeSceneObjectComponent from '../three-base-components/ThreeSceneObjectComponent';


export default class ModalConstructor extends ThreeSceneObjectComponent {
    constructor(componentToRender, renderProps, disposeFunc) {
        super();
        this.onModalClose = this.onModalClose.bind(this);

        this.uuid = uuidv1();
        this.componentToRender = componentToRender;
        this.renderProps = renderProps;
        this.renderProps.onClose = this.onModalClose;
        this.renderProps.uuid = this.uuid;
        this.renderProps.dispose = disposeFunc;
        this.renderProps.getTransforms = this.getTransforms;
    }

    updateRenderProps(renderProps) {
        this.renderProps = {...this.renderProps, ...renderProps };

        this.owner.modalComponentRenderProps = this.renderProps;
    }

    onClick() {
        console.log('MODAL CONSTR onClick');


        const payload = {
            uuid: this.uuid,
            componentToRender: this.componentToRender,
            renderProps: this.renderProps,
        };


    }

    onModalClose() {
        console.log('--onModalClose ');
    }



    // Retrieves Matrix transforms of visual and collider components
    getTransforms = () => {
        const colliderTransform = this.owner.sceneObject.matrix;
        const visualTransform = this.owner.visualObject.matrix;
        return { colliderTransform, visualTransform };
    }

    dispose() {
        // if (this.owner.scene) {
        //     this.onModalClose();
        // }
    }
}
