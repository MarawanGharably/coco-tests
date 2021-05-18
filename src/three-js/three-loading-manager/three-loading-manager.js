import { LoadingManager } from 'three';
import { SET_LOADING } from '../three-editor/threeEditorActionEnums';

class ThreeLoadingManager extends LoadingManager {
    setOnLoad(dispatch) {
        this.onLoad = () => {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
        };
    }
}

export default new ThreeLoadingManager();
