// import { SVGSpriteComponent, fetchSVGStringAsync } from 'three-svg';
// import { HoverCursorComponent } from 'three-cursor-style';
// import { PopUpComponent } from 'pop-up-component';
import fetchSVGStringAsync from './ProductMarkerHelper';
import InteractionObject from '../three-base-components/InteractionObject';
import SVGSpriteComponent from '../three-svg/SVGSpriteComponent';
import ModalComponent from '../modal-component/ModalComponent';

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
        scene.add(this.collider);

        this.collider.name = 'marker';
        this.svgSpriteComponent = new SVGSpriteComponent();
        this.attachComponent(this.svgSpriteComponent);
    }

    setPosition = (x, y, z) => {
        this.collider.position.x = x;
        this.collider.position.y = y;
        this.collider.position.z = z;

        this.visualObject.position.x = x;
        this.visualObject.position.y = y;
        this.visualObject.position.z = z;
    }

    renderComponentImmediately = () => {
        this.components.forEach((component) => {
            component.onClick();
        });
    }
}
