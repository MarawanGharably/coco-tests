import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useRouter } from 'next/router';
import Product from "./Product";
import {setSelectedFolder} from '../../../../../APImethods';
import styles from './ProductList.module.scss';


const ProductList = ({ productLibrary }) => {
    const { folders, selectedFolder, products } = productLibrary;
    const selectedFolderId = selectedFolder?.value;
    const dispatch = useDispatch();
    const router = useRouter();
    const {id:storeId} = router.query;

    const handleFolderChange = (selected) => {
        dispatch(setSelectedFolder(selected, storeId));
    };


    return (
      <div className={styles["product-list"]}>

          <Select
            id="folderSelector"
            instanceId="folderSelector"
            className={styles["selector"]}
            options={folders.map(item => ({
                  label: item.name,
                  value: item._id,
                  products: item.products
              })
            )}
            value={selectedFolder}
            onChange={handleFolderChange}
          />


          <div className={styles["list"]}>

              {products[selectedFolderId]?.length ?
                 products[selectedFolderId].map((item, i) => (
                  <Product key={item._id}  data={item} storeId={storeId}  />
                ))
                : <div className='mt-4'>Folder is empty</div>
              }
          </div>
      </div>
    );
};



ProductList.propTypes = {
    productLibrary: PropTypes.shape({
        products: PropTypes.arrayOf(PropTypes.object).isRequired,
        folders: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedFolder: PropTypes.shape({}),
    }).isRequired,
};


export default ProductList;
