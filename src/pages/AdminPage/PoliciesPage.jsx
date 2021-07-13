import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import SubmitButton from '../../components/FormComponents/SubmitButton';
import Layout from "../../layouts/Layout";
import { Row } from 'react-bootstrap';

import { createStorePolicy, getStores } from '../../APImethods';

const PoliciesPage = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const getPolicies = () => {
        getStores()
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
            createStorePolicy({ store_id: storeId })
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
        <Layout title="Create Store Policy" subTitle="Select a Store To Create a New Policy" >
            <Row className='justify-content-center mt-4'>
                    <Select
                        className="select"
                        placeholder="Select a Store"
                        options={stores}
                        onChange={(value) => onStoreSelected(value)}
                    />
            </Row>
            {error.length > 0 && (
                <Row>
                    <div className="error">{error}</div>
                </Row>
            )}
            <Row className='justify-content-center mt-4'>
                <SubmitButton
                    buttonText="CREATE"
                    submitting={submitting}
                    onClick={onClickCreatePolicy}
                />
            </Row>
        </Layout>);
};

export default PoliciesPage;
