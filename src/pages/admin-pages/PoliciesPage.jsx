import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import Select from 'react-dropdown-select';
import { apiAdminCreateStorePolicy, apiGetAllCMSStores } from '../../utils/apiUtils';


const PoliciesPage = () => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [submitEnabled, enableSubmit] = useState(false);

    useEffect(() => {
        // apiGetAllCMSStores()
        //     .then((response) => setStores(response));
    });

    const onStoreSelected = (value) => {
        setSelectedStore(value);
        enableSubmit(true);
    };


    const onClickCreatePolicy = () => {
        // eslint-disable-next-line no-underscore-dangle
        const storeId = selectedStore._id.$oid;
        apiAdminCreateStorePolicy(storeId)
            .then((response) => console.log(response));
    };

    return (
        <div className="flex flex-column flex-center full-width">
            <h2>Manage Store Policies</h2>
            <Select
                options={stores}
                onChange={(values) => onStoreSelected(values[0])}
                searchBy="name"
                labelField="name"
            />
            <button type="submit" enabled={submitEnabled} onClick={() => onClickCreatePolicy()}>
                Create New
                Policy
            </button>
        </div>
    );
};

export default PoliciesPage;
