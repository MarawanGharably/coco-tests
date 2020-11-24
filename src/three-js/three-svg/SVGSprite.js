import canvg from 'canvg';
import * as THREE from 'three';

export default class SVGSprite extends THREE.Sprite {
    constructor() {
        const material = new THREE.SpriteMaterial();
        super(material);
        this.scale.x = 0.35;
        this.scale.y = 0.35;
        this.scale.z = 0.35;

        this.setSVGString = this.setSVGString.bind(this);
    }

    setSVGString(svgString) {
        const drawCanvas = document.createElement('canvas');
        drawCanvas.width = 256;
        drawCanvas.height = 256;

        const v = canvg.fromString(
            drawCanvas.getContext('2d'),
            svgString,
            {
                enableRedraw: false,
                ignoreMouse: true,
                ignoreAnimation: true,
                ignoreClear: true,
            },
        );

        v.render();
        if (this.material.map) {
            this.material.map.dispose();
        }

        this.material.map = new THREE.Texture(drawCanvas);
        this.material.map.needsUpdate = true;
        this.material.needsUpdate = true;
    }
}
