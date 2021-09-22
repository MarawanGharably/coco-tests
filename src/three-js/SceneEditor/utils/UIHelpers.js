import { getComponentUUID } from './index';
import { UIManagerEnums } from '../../_contextDataManagers/UIManager'

export const hasUI = (marker, UIState) => {
    const uuid = getComponentUUID(marker);
    return UIState.dynamicUIs.has(uuid);
};

export const resetUI = (object, UIState, UIDispatch) => {
    if (!hasUI(object, UIState)) {
        UIDispatch({type: UIManagerEnums.RESET_UIS});
    }
};
