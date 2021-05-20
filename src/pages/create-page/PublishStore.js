import { useState } from 'react';
import { useHomePageDataStore } from '../../data-store/home-page-data-store/HomePageDataStore';
import { apiPublishSceneData } from '../../utils/apiUtils';

const PublishStore = () => {
    const [{ selectedStoreId }] = useHomePageDataStore();
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState({});

    const clearMessage = () => {
        setMessage({});
    };

    const publishSceneData = async () => {
        try {
            setLoading(true);
            await apiPublishSceneData(selectedStoreId);

            setMessage({
                title: 'Store Published successfully',
                backgroundColor: '#5cb85c',
            });
            setLoading(false);
        } catch(error) {
            setMessage({
                title: 'An error occurred while publishing store',
                backgroundColor: '#d9534f',
            });
            setLoading(false);
            console.error(error);
        }
    };

    return {
        message,
        isLoading,
        clearMessage,
        publishSceneData,
    };
};

export default PublishStore;
