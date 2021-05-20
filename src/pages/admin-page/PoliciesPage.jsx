import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { apiAdminCreateStorePolicy, apiGetAllCMSStores } from '../../utils/apiUtils';
import SubmitButton from '../../components/submit-button/SubmitButton';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';

const PoliciesPage = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const getPolicies = () => {
        apiGetAllCMSStores()
            .then((response) => {
                setStores(
                    response.map((option) => (
                        {
                            ...option,
                            label: option.name,
                            // eslint-disable-next-line no-underscore-dangle
                            value: option._id.$oid,
                        })),
                );
            })
            .catch((err) => {
                setError(err);
                setSubmitting(false);
            });
    };

    useEffect(() => {
        getPolicies();
    }, []);

    // useEffect(() => {
    //     console.log(stores);
    // }, [stores]);

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
                    setSelectedStore(null);
                }).catch((err) => {
                    setError(err);
                }).finally(() => setSubmitting(false));
        } else {
            setError('Please Select a Store');
        }
    };

    return (
        <Page
            pageTitle="Create Store Policy"
            pageSubTitle="Select a Store To Create a New Policy"
        >
            <PageRow width="auto">
                <PageItem>
                    <Select
                        className="select"
                        placeholder="Select a Store"
                        options={stores}
                        onChange={(value) => onStoreSelected(value)}
                    />
                </PageItem>
            </PageRow>
            {error.length > 0 && (
                <PageRow width="auto">
                    <PageItem>
                        <div className="error">{error}</div>
                    </PageItem>
                </PageRow>
            )}
            <PageRow width="auto">
                <SubmitButton
                    buttonText="CREATE"
                    submitting={submitting}
                    onClick={onClickCreatePolicy}
                />
            </PageRow>
        </Page>
    );
};

export default PoliciesPage;
