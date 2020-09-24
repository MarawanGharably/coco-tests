import React, { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import { apiAdminCreateStorePolicy, apiGetAllCMSStores } from '../../utils/apiUtils';
import SubmitButton from '../../components/submit-button/SubmitButton';


const PoliciesPage = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const getPolicies = () => {
        apiGetAllCMSStores()
            .then((response) => setStores(
                response.map((option) => (
                    {
                        ...option,
                        label: option.name,
                        // eslint-disable-next-line no-underscore-dangle
                        value: option._id.$oid,
                    })),
            ))
            .catch((err) => {
                console.log(err);
                setSubmitting(false);
            });
    };

    useEffect(() => {
        getPolicies();
    }, []);

    const onStoreSelected = (value) => {
        setSelectedStore(value);
    };


    const onClickCreatePolicy = () => {
        if (selectedStore) {
            setSubmitting(true);
            // eslint-disable-next-line no-underscore-dangle
            const storeId = selectedStore._id.$oid;
            apiAdminCreateStorePolicy({ store_id: storeId })
                .then(() => {
                    setError('Success');
                    setSubmitting(false);
                    setSelectedStore(null);
                }).catch((err) => {
                    setError(err);
                    setSubmitting(false);
                });
        } else {
            setError('Please select a store.');
        }
    };

    return (
        <div className="flex flex-column flex-center full-width">
            <h2>Select Store</h2>
            <Select
                options={stores}
                onChange={(value) => onStoreSelected(value[0])}
            />

            <SubmitButton
                buttonText="Create New Policy"
                submitting={submitting}
                onClick={() => onClickCreatePolicy()}
            />

            {error.length >= 1 && <p>{error}</p>}

        </div>
    );
};

export default PoliciesPage;
