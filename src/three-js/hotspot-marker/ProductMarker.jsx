// import { useState, useEffect, useRef } from 'react';
// import { useThree } from '../three-editor/ThreeEditor';
// import { useCollisionManager } from '../collision-manager/CollisionManager';
// import SVGSprite from '../three-svg/SVGSprite';

// const defaultUrl = 'https://cdn.obsess-vr.com/product-hotspot-icon-circle.svg';


// const ProductMarker = ({ svgUrl = defaultUrl }) => {
//     const [productSKU, setProductSKU] = useState('');

//     const [state] = useThree();
//     const [colliderState, colliderDispatch] = useCollisionManager();

//     const marker = useRef();

//     useEffect(() => {
//         marker.current = new SVGSprite();

//         // colliderDispatch({
//         //     type: CollisionManagerActionEnums.SET_COLLIDERS,
//         //     payload: marker.current.sceneObject,
//         // });

//         marker.current.addToScene(state.scene);

//         return () => {
//             marker.current.removeFromScene();
//             marker.current.dispose();
//         };
//     }, []); // eslint-disable-line

//     return (
//         null
//     );
// };

// export default ProductMarker;
