import { LoadingManager } from 'three';

class ThreeLoadingManager extends LoadingManager {
    setOnLoad() {
        this.onLoad = () => {
           console.log('---REMOVE IT!!!!!!!!!')
        };
    }
}

export default new ThreeLoadingManager();
