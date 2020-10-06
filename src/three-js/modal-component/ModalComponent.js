import { v1 as uuidv1 } from 'uuid';

import ThreeSceneObjectComponent from '../three-base-components/ThreeSceneObjectComponent';
import { UIManagerEnums } from '../ui-manager/UIManager';

export default class ModalComponent extends ThreeSceneObjectComponent {
    constructor(componentToRender, renderProps, disposeFunc) {
        super();
        this.onModalClose = this.onModalClose.bind(this);
        this.updateState = this.updateState.bind(this);

        this.uuid = uuidv1();
        this.componentToRender = componentToRender;
        this.renderProps = renderProps;
        this.renderProps.onClose = this.onModalClose;
        this.renderProps.updateState = this.updateState;
        this.renderProps.uuid = this.uuid;
        this.renderProps.dispose = disposeFunc;
        this.renderProps.getTransforms = this.getTransforms;
    }

    onClick() {
        const UIDispatch = this.owner.getUIDispatcher();
        if (!UIDispatch) {
            console.error(`UIDispatch not set on InteractableObject ${this.owner}`); // eslint-disable-line no-console
        }

        const payload = {
            uuid: this.uuid,
            componentToRender: this.componentToRender,
            renderProps: this.renderProps,
        };

        UIDispatch({
            type: UIManagerEnums.ADD_UI,
            payload,
        });
    }

    onModalClose() {
        const UIDispatch = this.owner.getUIDispatcher();
        if (!UIDispatch) {
            console.error(`UIDispatch not set on InteractableObject ${this.owner}`); // eslint-disable-line no-console
        }

        UIDispatch({
            type: UIManagerEnums.REMOVE_UI,
            payload: { uuid: this.uuid },
        });
    }

    updateState(uiState) {
        const UIDispatch = this.owner.getUIDispatcher();
        if (!UIDispatch) {
            console.error(`UIDispatch not set on InteractableObject ${this.owner}`); // eslint-disable-line no-console
        }

        UIDispatch({
            type: UIManagerEnums.UPDATE_UI_STATE,
            payload: {
                uuid: this.uuid,
                uiState,
            },
        });
    }

    // Retrieves Matrix transforms of visual and collider components
    getTransforms = () => {
        const colliderTransform = this.owner.sceneObject.matrix;
        const visualTransform = this.owner.visualObject.matrix;
        return { colliderTransform, visualTransform };
    }

    dispose() {
        this.onModalClose();
    }
}
