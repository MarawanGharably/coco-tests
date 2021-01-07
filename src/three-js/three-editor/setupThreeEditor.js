// import * as THREE from 'three';

export const setupRenderer = (
    renderer, canvasContainer, widthMultiplier = 1, heightMultiplier = 1,
) => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasContainer.offsetWidth * widthMultiplier,
        canvasContainer.offsetHeight * heightMultiplier);
    renderer.setClearColor('black');
    canvasContainer.appendChild(renderer.domElement);
};

export const setupCamera = (aspectRatio, camera) => {
    const posX = 0.1;
    const rotY = (90 * Math.PI) / 180;

    camera.position.set(posX, 0, 0);
    camera.rotation.set(0, rotY, 0);
    camera.lookAt(0, 0, 0);
};

/* eslint-disable */
export const setupControls = (controls) => {
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.3;
    controls.maxPolarAngle = Math.PI;
    controls.enableKeys = false;
    controls.enableZoom = false;
    controls.enablePan = false;
};
