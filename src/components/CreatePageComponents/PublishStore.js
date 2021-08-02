import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiPublishSceneData } from '../../utils/apiUtils';
import { showMessage } from '../../store/actions/toastActions';
import { SUCCESS, DANGER } from '../../store/types/toast';

const PublishStore = () => {
    const HomePageStore = useSelector(state => state['HomePageStore']);
    const dispatch = useDispatch();
    const { selectedStoreId } = HomePageStore;
    const [isLoading, setLoading] = useState(false);

    const publishSceneData = async () => {
        try {
            setLoading(true);
            await apiPublishSceneData(selectedStoreId);

            dispatch(showMessage('Store Published successfully', SUCCESS));
        } catch(error) {
            dispatch(showMessage('An error occurred while publishing store', DANGER));

            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        isLoading,
        publishSceneData,
    };
};

export default PublishStore;
