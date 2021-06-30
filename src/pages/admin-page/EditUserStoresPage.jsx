import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Select from 'react-select';
import { apiAdminGetAllUserAccounts, apiAdminGetAllStorePolicies, apiAdminAddUserToStorePolicy } from '../../utils/apiUtils';
import {Checkbox, SubmitButton} from '../../components/FormComponents';
import Layout from "../../layouts/Layout";


const EditUserStoresPage = () => {
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [hasProductLibrary, setProductLibrary] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const parseUserInfo = (attributeArray) => {
        let [email, subId] = ['', ''];
        attributeArray.forEach(attribute => {
            if (attribute.Name === 'sub') {
                subId = attribute.Value;
            }
            if (attribute.Name === 'email') {
                email = attribute.Value;
            }
        });
        return [email, subId];
    };

    const getUsers = () => {
        apiAdminGetAllUserAccounts()
            .then(response => {
                setUsers(response.map(option => {
                    const [email, subId] = parseUserInfo(option.Attributes);
                    return {
                        ...option,
                        label: email,
                        value: subId,
                    };
                }));
            })
            .catch(err => {
                setError(err);
                setSubmitting(false);
            });
    };


    const getPolicies = () => {
        apiAdminGetAllStorePolicies()
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
        getUsers();
        getPolicies();
    }, []); // eslint-disable-line

    const handleProductLibraryChange = (e) => {
        const { checked } = e.target;

        setProductLibrary(checked);
    };

    const onClickAddUserToStore = () => {
        if (selectedStore && selectedUser) {
            setSubmitting(true);
            const userId = selectedUser.Username;
            const policyId = selectedStore.access_policy;
            const userEmail = selectedUser.label;
            const storeName = selectedStore.name;

            apiAdminAddUserToStorePolicy({
                username: userId, group_name: policyId, product_library_enabled: hasProductLibrary,
            })
                .then(() => {
                    setError({ message: `${userEmail} added to ${storeName}` });

                    setSelectedStore(null);
                }).catch(err => {
                    setError(err);
                }).finally(() => setSubmitting(false));
        }
    };

    return (
        <Layout title="Edit User Stores" subTitle="Add Stores to Users" >
            <Row className='justify-content-center flex-column my-5'>
                <Select
                    className="select align-self-center"
                    placeholder="Select a User"
                    options={users}
                    onChange={(value) => setSelectedUser(value)}
                />

                <Select
                    className="select align-self-center"
                    placeholder="Select a Store"
                    options={stores}
                    onChange={(value) => setSelectedStore(value)}
                />

                <Checkbox
                    name="has-product-library"
                    className='align-self-center'
                    label="Products Library Enabled"
                    value={hasProductLibrary}
                    handleChange={handleProductLibraryChange}
                />
            </Row>


            {(error?.message) && (
                <Row className='my-5'>
                    <div className="error">{error.message}</div>
                </Row>
            )}

            <Row className='justify-content-center'>
                <SubmitButton
                    buttonText="SUBMIT"
                    submitting={submitting}
                    onClick={onClickAddUserToStore}
                />
            </Row>
        </Layout>
    );
};

export default EditUserStoresPage;
