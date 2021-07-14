import React, { useEffect, useState } from 'react';
import { Row, Form } from 'react-bootstrap';
import Select from 'react-select';
import { SubmitButton} from '../../components/FormComponents';
import Layout from "../../layouts/Layout";
import { getUsers, getPolicies, addUserToStorePolicy } from '../../APImethods'


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





    useEffect(() => {
        getUsers()
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

        getPolicies()
            .then((response) => {
                setStores(
                    response.map((option) => (
                        {
                            ...option,
                            label: option.name,
                            value: option._id.$oid,
                        })),
                );
            })
            .catch((err) => {
                setError(err);
                setSubmitting(false);
            });

    }, []); // eslint-disable-line



    const onClickAddUserToStore = () => {
        if (selectedStore && selectedUser) {
            setSubmitting(true);
            const userId = selectedUser.Username;
            const policyId = selectedStore.access_policy;
            const userEmail = selectedUser.label;
            const storeName = selectedStore.name;

            addUserToStorePolicy({
                username: userId,
                group_name: policyId,
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
