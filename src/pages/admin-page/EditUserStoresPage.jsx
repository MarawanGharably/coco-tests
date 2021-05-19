import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { apiAdminGetAllUserAccounts, apiAdminGetAllStorePolicies, apiAdminAddUserToStorePolicy } from '../../utils/apiUtils';
import Page from '../../layouts/page-template/Page';
import PageRow from '../../components/page-row/PageRow';
import PageItem from '../../components/page-item/PageItem';
import SubmitButton from '../../components/submit-button/SubmitButton';

const EditUserStoresPage = () => {
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
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

    const onClickAddUserToStore = () => {
        if (selectedStore && selectedUser) {
            setSubmitting(true);
            const userId = selectedUser.Username;
            const policyId = selectedStore.access_policy;
            const userEmail = selectedUser.label;
            const storeName = selectedStore.name;

            apiAdminAddUserToStorePolicy({ username: userId, group_name: policyId })
                .then(() => {
                    setError({ message: `${userEmail} added to ${storeName}` });

                    setSelectedStore(null);
                }).catch(err => {
                    setError(err);
                }).finally(() => setSubmitting(false));
        }
    };

    return (
        <Page
            pageTitle="Edit User Stores"
            pageSubTitle="Add Stores to Users"
        >
            <PageRow width="auto">
                <PageItem>
                    <Select
                        className="select"
                        placeholder="Select a User"
                        options={users}
                        onChange={(value) => setSelectedUser(value)}
                    />
                </PageItem>
            </PageRow>
            <PageRow width="auto">
                <PageItem>
                    <Select
                        className="select"
                        placeholder="Select a Store"
                        options={stores}
                        onChange={(value) => setSelectedStore(value)}
                    />
                </PageItem>
            </PageRow>
            {(error?.message) && (
                <PageRow width="auto">
                    <PageItem>
                        <div className="error">{error.message}</div>
                    </PageItem>
                </PageRow>
            )}
            <PageRow width="auto">
                <SubmitButton
                    buttonText="SUBMIT"
                    submitting={submitting}
                    onClick={onClickAddUserToStore}
                />
            </PageRow>
        </Page>
    );
};

export default EditUserStoresPage;
